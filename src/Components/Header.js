import React, {Component} from 'react';
import {Navbar, Nav, FormControl, Container, Button, Form} from 'react-bootstrap';
import logo from './logo.png';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import BiddingRules from '../Pages/BiddingRules';
import CreateAnAuction from '../Pages/CreateAnAuction';
import QuestionAnswer from '../Pages/QuestionAnswer';
import DetailInformation from "../Pages/DetailInformation";


export default class Header extends Component {
    render() {
        return (
            <>
                <Navbar fixed='top' collapseOnSelect expand='md' bg='light' variant='light'>
                    <Container>
                        <Navbar.Brand href='/'>
                            <img
                                src={logo}
                                height='75'
                                width='75'
                                className='d-inline-block align-top'
                                alt='logo'
                            />{''}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='mr-auto'>
                                <Nav.Link href='/'>Главная</Nav.Link>
                                <Nav.Link href='/biddingRules'>Правила торгов</Nav.Link>
                                <Nav.Link href='/createAnAuction'>Создать аукцион</Nav.Link>
                                <Nav.Link href='/questionAnswer'>Вопрос-ответ</Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl
                                    type='text'
                                    placeholder='Введите запрос'
                                    className='mr-sm-2'
                                />
                                <Button variant='outline-dark'>Поиск</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Router>
                    <Switch>
                        <Route exact path='/' component={HomePage}/>
                        <Route exact path='/biddingRules' component={BiddingRules}/>
                        <Route exact path='/createAnAuction' component={CreateAnAuction}/>
                        <Route exact path='/questionAnswer' component={QuestionAnswer}/>
                        <Route exact path='/detailInformation' component={DetailInformation}/>
                    </Switch>
                </Router>

            </>
        );
    }
}

