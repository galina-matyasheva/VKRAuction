import React, {Component, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import infoHomes from '../HomeInfo';
import CarouselDetailInfo from '../Components/CarouselDetailInfo';
import api from '../api';


export default class DetailInformation extends Component {
    amount;
    account;
    highestBid;
    constructor(props) {
        super(props);

        this.amount = 0;
        this.account = '';
        this.highestBid = 200;
    }

    handleChangeBidAccount = async event => {
        this.account = event.target.value;
    };

    handleChangeBidAmount = async event => {
        this.amount = event.target.value;
    };

    render() {

        const ModalBid  = () => {
            const [show, setShow] = useState(false);

            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
            const handleOk = async () => {

                if (this.account == null || this.amount == null) {
                    return;
                }
                if (this.account === '' || this.account.trim().length === 0 ||
                    this.amount === '' || this.amount <= 0) {
                    alert('Вы ввели некорректное значение' + 'account: ' + this.account + 'amount: ' + this.amount + ' ' + this.account.trim().length
                    + ' ' + this.amount.replace(/\d/g, '').length);
                    return;
                }

                const payload = {account: this.account, amount: this.amount};
                await api.createBid(payload);
                const resHighestBid = api.getHighestBid();
                this.highestBid = resHighestBid.highestBid;
                //this.highestBid = this.amount > this.highestBid ? this.amount : this.highestBid;
                window.alert(`заявка создана успешно`);
                setShow(false);
                this.forceUpdate();
            }
            return (
                <>
                    <Button variant="primary" onClick={handleShow}>
                        Подать заявку
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Заявка на участие в аукционе</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Введите свой аккаунт и сумму заявки
                            <input type='textarea' placeholder="Введите аккаунт" onChange={this.handleChangeBidAccount} required/><br/>
                            <input type="number" placeholder="Введите сумму" onChange={this.handleChangeBidAmount} required/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Отмена
                            </Button>
                            <Button variant="primary" onClick={handleOk}>
                                ok
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            );
        }
        return (
                <div className='container indent'>

                    <div>
                        <ModalBid/>
                    </div>
                    <h2>{infoHomes[0].name}</h2>
                <div>

                    <p className='detail-information features'><strong>Стартовая цена:</strong> {infoHomes[0].price} ETH</p>
                </div>
                <CarouselDetailInfo/>
                <div className='detail-information features'>
                    <h3>Дополнительная информация:</h3>
                <p>{infoHomes[0].text}</p>
                </div>
                    <div className='detail-information features'><strong>Значение наивысшей заявки:</strong> {this.highestBid} ETH</div>
                    <div className='detail-information features'><strong>Статус аукциона:</strong>  активен </div>
                </div>
        )
    }
}