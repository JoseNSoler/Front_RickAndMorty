import { Container, Row, Col, Card, Button, Form, Stack } from "react-bootstrap"
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllCharacters, filterAlive, filterMany, page, characterFav, delCharacter } from '../actions'


import { Navigate, useNavigate  } from 'react-router-dom';

const Character = (props) => {

    let navigate = useNavigate();

    const [ isFav, setIsFav ] = useState();

    const [ character, setCharacter ] = useState();

    useEffect(() => {


    }, [isFav, props.data]);



    console.log(props.fav)
    console.log(props.data)

    const checkFav = (e) => {
        e.preventDefault();
        console.log(props.fav)

        props.dispatch(characterFav(props.data, props.fav))

        // navigate("/favorites", { replace: true });
    }

    const delFav = (e) => {
        e.preventDefault();

        props.dispatch(delCharacter(props.data))

        // navigate("/favorites", { replace: true });
    }

    if (props.data && props.data.location) {
        return(
            <Container>
                <Row xs={1} md={2}>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={props.data.image} />
                            <Card.Body>
                                <Card.Text>
                                    <a className="cardTitle">{props.data.name}</a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>ESPECIE = {props.data.species}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Genero = {props.data.gender} __ Situacion = {props.data.status}</Card.Subtitle>
                                <Card.Text>
                                    Visto por ultima vez en:  {props.data.location.name}
                                </Card.Text>
                                <Card.Text>
                                    Primeramente visto en: {props.data.origin.name}
                                </Card.Text>
                                <Card.Link href="#" onClick={(e) => { checkFav(e) }}> {(!props.fav.includes(props.data)) && <>Agregar a fav </> }</Card.Link>
                                <Card.Link href="#" onClick={(e) => { delFav(e) }}> {(props.fav.includes(props.data)) && <>EN FAVORITOS</> }</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        )
    } else {
        return(<>NO HABEMUS NADA</>)
    }

}

const stateMapToPros = state => {
    return { data: state.allForOne.character, fav: state.allForOne.user }
}


export default connect(stateMapToPros)(Character)