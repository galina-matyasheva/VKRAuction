import React, {Component, useEffect, useState} from 'react';
import api from '../api'
import UploadForm from '../Components/UploadForm';
import {beginAddPhoto} from "../actions/photos";
import {Button, Form} from "react-bootstrap";
import {connect} from "react-redux";


export default class CreateAnAuction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: '123',
            title: '',
            price: '',
            details: '',
        }
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    addProperty = async () => {
        const { uuid, title, price, details, uploadFormState } = this.state
        //const arrayTime = time.split'/')
        const payload = { uid: uuid, title, price, details, uploadFormState }

        await api.createAuction(payload).then(res => {
            window.alert(`аукцион создан успешно`);
            this.setState({
                uuid: this.uuidv4(),
                name: '',
                rating: '',
                time: '',
            });
        }, error => window.alert("error" + error));
    }

    handleChangeTitle = async event => {
            const title = event.target.value
            this.setState({ title })
    };

    handleChangePrice = async event => {
        const price = event.target.value
        this.setState({ price })
    };


    handleChangeDetails = async event => {
        const details = event.target.value;
        this.setState({ details })
    };

    render() {
        const { title, price, details, uploadFormState } = this.state;
        return (
            <div className='container indent'>
                <h1>Заполните все поля</h1>
                    <div className='form-row'>
                        <div className='col'>
                            <span className='star-color'>*</span>  <input className="form-control" type="text" placeholder="Заголовок" value={title} onChange={this.handleChangeTitle} required/>
                        </div>
                        <div className='col'>
                            <span className='star-color'>*</span>  <input className="form-control" type="number" value={price} onChange={this.handleChangePrice} placeholder="Цена в ETH" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleTextarea"><h3 className='h3-create-auction' required>Детальное описание</h3></label><span className='star-color'>  *</span>
                        <textarea className="form-control" id="exampleTextarea" rows="10" value={details} onChange={this.handleChangeDetails}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlFile1" required>Загрузить фотографии</label><span className='star-color'>  *</span>
                        <UploadForm state={uploadFormState}/>
                    </div>

                    <div className="form-row">
                        <div className="col">
                            Введите дату начала <span className='star-color'>  *</span>
                            <input type="date" className="form-control" id="startDate" name="date" placeholder="Дата" />
                        </div>
                        <div className="col">
                            Введите дату завершения <span className='star-color'>  *</span>
                            <input type="date" className="form-control" id="endDate" name="date" placeholder="Дата" />
                        </div>
                    </div>

                     <div className='form-row btn-to'>
                         <div className='col'>
                         <button type="submit" className="btn btn-dark" onClick={this.addProperty}>ОК</button>
                         </div>
                         <div className='col'>
                             <button type="submit" className="btn btn-dark" >ОТМЕНА</button>
                         </div>
                     </div>
            </div>
        )
    }
}