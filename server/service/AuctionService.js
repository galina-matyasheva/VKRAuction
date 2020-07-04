import AuctionFactory from '../contracts/AuctionFactory.sol'
import Auction from '../contracts/Auction.sol'
import truffleConfig from '../truffle.js'

class AuctionService {
    constructor() {
        const web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;

        let web3Provided;
        // Поддерживает Metamask and Mist и другие кошельки, которые предоставляют «web3».
        if (typeof web3 !== 'undefined') {
            // Использ. Mist / кошелек провайдера

            web3Provided = new Web3(web3.currentProvider);
        } else {
            web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
        }
        AuctionFactory.setProvider(web3Provided)
        Auction.setProvider(web3Provided)
    }

    getAuction(auctionAddr) {
        const auction = Auction.at(auctionAddr)
        const owner = auction.owner.call()
        const startBlock = auction.startBlock.call()
        const endBlock = auction.endBlock.call()
        const bidIncrement = auction.bidIncrement.call()
        const highestBid = auction.getHighestBid.call()
        const highestBindingBid = auction.highestBindingBid.call()
        const highestBidder = auction.highestBidder.call()
        const canceled = auction.canceled.call()

        return Promise.all([ owner, startBlock, endBlock, bidIncrement, highestBid, highestBindingBid, highestBidder, canceled ]).then(vals => {
            const [ owner, startBlock, endBlock, bidIncrement, highestBid, highestBindingBid, highestBidder, canceled ] = vals
            return {
                contract: auction,
                address: auctionAddr,
                owner: owner,
                startBlock: startBlock.toString(),
                endBlock: endBlock.toString(),
                bidIncrement: this.props.web3.fromWei(bidIncrement, 'ether').toString(),
                highestBid: this.props.web3.fromWei(highestBid, 'ether').toString(),
                highestBindingBid: this.props.web3.fromWei(highestBindingBid, 'ether').toString(),
                highestBidder: highestBidder,
                canceled: canceled,
            }
        });
    }

    cancelAuction(auction, account) {
        auction.contract.cancelAuction({ from: account });
    }

    placeBid(auction, account, bidAmount) {
        auction.contract.placeBid({ from: account, value: this.props.web3.toWei(bidAmount, 'ether') });
    }

    getHighestBid() {
        return auction.contract.getHighestBid();
    }

    getAccountBids(account) {
        const getBidPromises = this.state.auctions.map(auction => {
            return auction.contract.fundsByBidder.call(account).then(bid => {
                return { auction: auction.address, bid }
            })
        })

        return Promise.all(getBidPromises).then(results => {
            let currentAccountBids = {}
            for (let x of results) {
                currentAccountBids[x.auction] = this.props.web3.fromWei(x.bid, 'ether').toString()
            }
            return currentAccountBids;
        })
    }

    createAuction(account, reserve, bidIncrement, startBlock, endBlock) {
        AuctionFactory.deployed().createAuction(
            reserve, bidIncrement, startBlock, endBlock,
            { from: account, gas: 4000000 });
    }

    getAllAuctions() {
        return new Promise((resolve, reject) => {
            return AuctionFactory.deployed().allAuctions.call().then(result => {
                return Promise.all( result.map(auctionAddr => this.getAuction(auctionAddr)) )
            }).then(auctions => {
                let auctionEventListeners = Object.assign({}, this.state.auctionEventListeners)
                const unloggedAuctions = auctions.filter(auction => this.state.auctionEventListeners[auction.address] === undefined)
                for (let auction of unloggedAuctions) {
                    auctionEventListeners[auction.address] = auction.contract.LogBid({ fromBlock: 0, toBlock: 'latest' })
                    auctionEventListeners[auction.address].watch(this.onLogBid)
                }
            })
        })
    }
}