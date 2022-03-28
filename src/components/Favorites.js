import { Container, Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Button, Card } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { delCharacter } from '../actions'



const Favorites = (props) => {

    console.log(props.fav)

    const deletCharacter = (e, item) => {

        props.dispatch(delCharacter(item))
    }

    return (
        <Container>
            <Row xs={1} md={3}>
            {props.fav.map(item => {
                return (
                    <Col >
                        <Card className='cardFav'>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Text>
                                    Descripcion
                                </Card.Text>

                                <Button variant="danger" onClick={(e) => deletCharacter(e, item)} >Eliminar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )

            })
            }
            </Row>

        </Container>

    )
}


const stateMapToPros = state => {

    return { fav: state.allForOne.user }

}


export default connect(stateMapToPros)(Favorites)