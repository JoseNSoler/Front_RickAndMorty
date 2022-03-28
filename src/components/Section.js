import { Container, Row, Col, Card, Button, Form, Stack } from "react-bootstrap"
import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllCharacters, filterAlive, filterMany, page, characterInfo } from '../actions'

import { Navigate, useNavigate  } from 'react-router-dom';



const Section = (props) => {

    let navigate = useNavigate();
    

    const [state, setState] = useState();

    const [resultList2, setResultList2] = useState(["uno", "aaasd", "fgdf", "rtert"]);

    const [resultList, setResultList] = useState([]);

    const [filterAliveStr, setFilterAliveStr] = useState();

    const [filterGenderStr, setFilterGenderStr] = useState();

    const [nextPage, setNextPage] = useState();

    const [prevPage, setPrevPage] = useState();


    const statusClick = (e) => {
        e.preventDefault();
        setFilterAliveStr(e.target.value)
    }

    const genderClick = (e) => {
        e.preventDefault();
        setFilterGenderStr(e.target.value)
    }

    //  ------------------------------------------------ filtros---------------------------------------------------
    const Filters = () => {
        return (
            <Row xs={1} md={2} lg={3} style={{margin: '1.5rem 0 1.5rem 0'}}>
                <Col>
                    <Form.Select aria-label="Status Living" className="selectionStatus" defaultValue={filterAliveStr}>
                        <option value="Dead" onClick={(e) => statusClick(e)}>Dead</option>
                        <option value="Alive" onClick={(e) => statusClick(e)} >Alive</option>
                        <option value="unknown" onClick={(e) => statusClick(e)} >*unknown</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select aria-label="Gender" className="selectionGender" defaultValue={filterGenderStr}>
                        <option value="Female" onClick={(e) => genderClick(e)}>Female</option>
                        <option value="Male" onClick={(e) => genderClick(e)} >Male</option>
                        <option value="Genderless" onClick={(e) => genderClick(e)} >Genderless</option>
                        <option value="unknown" onClick={(e) => genderClick(e)} >*unknown</option>
                    </Form.Select>

                </Col>
            </Row>

        )
    }

    useEffect(() => {

        var bool = (filterAliveStr || filterGenderStr)
            if (bool) {
                console.log("sdassadassdasadd")
                props.dispatch(filterMany(setState, [filterAliveStr, filterGenderStr]))
            }
            if (!bool) {
                console.log("sdad")
                props.dispatch(getAllCharacters(setState))

            }
        if (nextPage || prevPage) {
            if (nextPage) props.dispatch(page(setState, nextPage))
            else props.dispatch(page(setState, prevPage))
        }



    }, [filterAliveStr, filterGenderStr, nextPage, prevPage]);


    //  ------------------------------------------------ Resultados ---------------------------------------------------
    const sendCharacter = (e, item) => {
        
        e.preventDefault();
        console.log(item)
        
        props.dispatch(characterInfo(item, props.data))

        navigate("/Front_RickAndMorty/character", { replace: true });
    }


    const Results = () => {
        console.log(props)
        return (
            <Row xs={1} md={2} lg={3} xl={4}>
                {props.data.results ? props.data.results.map((item) => (
                    <Col key={item.id}>

                        <Card className="backCard" style={{ width: '18rem', height: '26rem', margin: '4% 0 4% 0' }}>
                            <div className="ContImgCard"> <Card.Img variant="top" src={item.image} className="imgCard" /> </div>
                            <Card.Body style={{padding: '1.1rem 2rem'}}>
                                <Card.Title style={{margin:'0 0 0.1rem 0',  fontWeight: 'bolder'}} >{item.name}</Card.Title>
                                <Card.Text style={{margin:'0 0 0.1rem 0'}}>
                                    {item.status} -
                                    {item.gender} -
                                    {item.species}
                                </Card.Text>
                                <Button style={{margin:'0 0 0 2.2rem'}} variant="primary" href="/Front_RickAndMorty/character" onClick={(e) => sendCharacter(e, item)} >Agregar Favorito</Button>
                            </Card.Body>
                        </Card>

                    </Col>
                )) : "asdasd"}
            </Row>
        )
    }

    const pageClick = (e) => {
        setPrevPage("")
        setNextPage("")
        e.preventDefault();
        if (e.target.value === "PrevPag") setPrevPage(props.data.info.prev)
        if (e.target.value === "NextPag") setNextPage(props.data.info.next)
    }

    //  ------------------------------------------------ pages ---------------------------------------------------
    const ControlPages = () => {
        return (
            <Stack direction="horizontal" gap={2} className="NumberPages">
                <Button value="PrevPag"
                    variant="danger" className=" border" onClick={(e) => pageClick(e)} >Prev. Pagina</Button>

                <Button value="NextPag"
                    variant="danger" className=" border ms-auto" onClick={(e) => pageClick(e)} >Sig. Pagina</Button>
            </Stack>
        )
    }

                                        

    return (
        <Container className="resultCont">
            <div style={{fontWeight: 'bolder'}}>
                Si no funciona el filtro, porfavor recargar varias veces la pagina, esto es debido a un problema con la API de Rick and Morty
                Mas informacion <a target="_blank" href="https://github.com/afuh/rick-and-morty-api/issues/72">aqui</a>
            </div>

            <Filters />

            <ControlPages />

            <Results />

            <ControlPages />

        </Container>
    )
}


const stateMapToPros = state => {
    return { data: state.allForOne.result, char: state.allForOne.character }

}


export default connect(stateMapToPros)(Section)