 import React, {Component} from 'react';
 import {Container, Card, CardDeck, Nav} from 'react-bootstrap';

 class HomeCard extends Component{
     render(){
         const {infoHome} = this.props;

         return(
             <div>
                 <Container className='container'>
                     <CardDeck>
                         <Card>
                             <Card.Img
                                 variant='top'
                                 src= {infoHome.imagePath}
                             />
                             <Card.Body>
                                 <Card.Title ClassName='card-title'>{infoHome.address}</Card.Title>
                                 <Card.Text ClassName='card-text'>
                                     <p>Стартовая цена:{infoHome.price} ETH</p>
                                 </Card.Text>


                                 <Nav className='mr-auto'>
                                     <Nav.Link href='/detailInformation'>Подробная информация</Nav.Link>
                                 </Nav>

                             </Card.Body>
                         </Card>
                     </CardDeck>
                 </Container>

             </div>
         )
     }
 }

export default HomeCard

