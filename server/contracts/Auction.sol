pragma solidity ^0.4.8;

contract Auction {
    // статические данные
    address public owner;
    uint public bidIncrement;
    uint public startBlock;
    uint public endBlock;
    string public ipfsHash;

    // Данные состояния
    bool public canceled;
    uint public highestBindingBid;
    address public highestBidder;
    mapping(address => uint256) public fundsByBidder;
    bool ownerHasWithdrawn;

    event LogBid(address bidder, uint bid, address highestBidder, uint highestBid, uint highestBindingBid);
    event LogWithdrawal(address withdrawer, address withdrawalAccount, uint amount);
    event LogCanceled();

    function Auction(address _owner, uint _bidIncrement, uint _startBlock, uint _endBlock, string _ipfsHash) {
        if (_startBlock >= _endBlock) throw;
        if (_startBlock < block.number) throw;
        if (_owner == 0) throw;

        owner = _owner;
        bidIncrement = _bidIncrement;
        startBlock = _startBlock;
        endBlock = _endBlock;
        ipfsHash = _ipfsHash;
    }

    function getHighestBid()
        constant
        returns (uint)
    {
        return fundsByBidder[highestBidder];
    }

    function placeBid()
        payable
        onlyAfterStart
        onlyBeforeEnd
        onlyNotCanceled
        onlyNotOwner
        returns (bool success)
    {
        // отклонение оплаты 0 ETH
        if (msg.value == 0) throw;

        // расчитать общую ставку пользователя на основе текущей суммы, которую он отправил в контракт
        //плюс все, что было отправлено с этой транзакцией
        uint newBid = fundsByBidder[msg.sender] + msg.value;

        // если данный пользователь не перебил наивысшую заявку, то мы отменяем его заявку
        if (newBid <= highestBindingBid) throw;

        // захват предыдущей самой высокой заявки (перед обновлением)
        //если отправитель предъявляет самую высокую цену, то просто увеличиваем максимальную ставку
        // highestBidder and is just increasing their maximum bid).
        uint highestBid = fundsByBidder[highestBidder];

        fundsByBidder[msg.sender] = newBid;

        if (newBid <= highestBid) {
            //если пользователь перебил самую высокую ставку, но не наивысшую, то происходит
            // увеличение наивысшей ставки привязки, а наивысшая ставка остается неизменной

            // но если отправитель заявки отправляет сумму равную наивысшей ставке, то данный случай невозможен,
            //т.к. нельзя сделать ставку меньше ETH того, что уже было предложено

            highestBindingBid = min(newBid + bidIncrement, highestBid);
        } else {
            // если отправитель уже участник с наивысшей ставкой и хочет просто повысить
            //его максимальную ставку, в этом случает наивысшая ставка не увеличивается

            // если пользователь не с наивысшей ставкой полностью перебил самую высокую ставку, то устанавливается его ставка
            //в качестве нового пользователя с наивысшей ставкой и производится пересчет наивысшей ставки привязки

            if (msg.sender != highestBidder) {
                highestBidder = msg.sender;
                highestBindingBid = min(newBid, highestBid + bidIncrement);
            }
            highestBid = newBid;
        }

        LogBid(msg.sender, newBid, highestBidder, highestBid, highestBindingBid);
        return true;
    }

    function min(uint a, uint b)
        private
        constant
        returns (uint)
    {
        if (a < b) return a;
        return b;
    }

    function cancelAuction()
        onlyOwner
        onlyBeforeEnd
        onlyNotCanceled
        returns (bool success)
    {
        canceled = true;
        LogCanceled();
        return true;
    }

    function withdraw()
        onlyEndedOrCanceled
        returns (bool success)
    {
        address withdrawalAccount;
        uint withdrawalAmount;

        if (canceled) {
            // если аукцион был отменен, то каждому должно быть разрешено снять свои средства
            withdrawalAccount = msg.sender;
            withdrawalAmount = fundsByBidder[withdrawalAccount];

        } else {
            // аукцион отменен без отмены

            if (msg.sender == owner) {
                // владелец недвижимости должен иметь возможность снять наивысшую ставку
                withdrawalAccount = highestBidder;
                withdrawalAmount = highestBindingBid;
                ownerHasWithdrawn = true;

            } else if (msg.sender == highestBidder) {
                // участник, предложивший самую высокую цену, должен иметь право снимать только разницу между
                 //самой высокой ставкой и самой наивысшей ставкой

                withdrawalAccount = highestBidder;
                if (ownerHasWithdrawn) {
                    withdrawalAmount = fundsByBidder[highestBidder];
                } else {
                    withdrawalAmount = fundsByBidder[highestBidder] - highestBindingBid;
                }

            } else {
                // любой, кто участвовал, но не выиграл аукцион, должен быть допущен к
                // выводу полной суммы своих средств
                withdrawalAccount = msg.sender;
                withdrawalAmount = fundsByBidder[withdrawalAccount];
            }
        }

        if (withdrawalAmount == 0) throw;

        fundsByBidder[withdrawalAccount] -= withdrawalAmount;

        // отправка средств
        if (!msg.sender.send(withdrawalAmount)) throw;

        LogWithdrawal(msg.sender, withdrawalAccount, withdrawalAmount);

        return true;
    }

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _;
    }

    modifier onlyNotOwner {
        if (msg.sender == owner) throw;
        _;
    }

    modifier onlyAfterStart {
        if (block.number < startBlock) throw;
        _;
    }

    modifier onlyBeforeEnd {
        if (block.number > endBlock) throw;
        _;
    }

    modifier onlyNotCanceled {
        if (canceled) throw;
        _;
    }

    modifier onlyEndedOrCanceled {
        if (block.number < endBlock && !canceled) throw;
        _;
    }
}


