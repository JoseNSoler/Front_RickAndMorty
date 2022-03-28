import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';

import { fetchRandom, onlyNumbers, onlySuit, suitAndNumber } from '../actions'

import List from 'react-list-select'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Container, Row, Col } from 'react-bootstrap';



const Result = (props) => {
  const optionsSuit = [
    { value: 'DIAMONDS', label: 'Diamonds' },
    { value: 'SPADES', label: 'Spades' },
    { value: 'HEARTS', label: 'Hearts' },
    { value: 'CLUBS', label: 'Clubs' }
  ]


  const animatedComponents = makeAnimated();

  const [state, setState] = useState();

  const [btnCheck, setBtnCheck] = useState(false);

  const [checked, setChecked] = useState(['numeros']);

  const [listChecked, setListChecked] = useState(optionsSuit[0]);

  let itemsSuit = ['DIAMONDS', 'SPADES', 'HEARTS', 'CLUBS'];


  const [suit, setSuit] = useState()

  const listClick = (e) => {
    console.log(e)
    setListChecked(e);

    console.log("asdasdasdasd")
    props.dispatch(onlySuit(setState, e, btnCheck))

  }

  const Lists = () => {
    return (
      <div>
        <Select
          components={animatedComponents}
          defaultValue={[optionsSuit[0]]}
          options={optionsSuit}
          onChange={(e) => listClick(e)} />
      </div>
    );
  }


  const onClicker = (e) => {
    e.preventDefault();
    props.dispatch(fetchRandom(setState));
  };


  const onSubmit = (e) => {

    e.preventDefault();



    if (checked.includes("numeros")) props.dispatch(fetchRandom(setState));
    else if (btnCheck) props.dispatch(suitAndNumber(setState, btnCheck, listChecked))
    else if (!btnCheck) props.dispatch(onlySuit(setState, listChecked, btnCheck))
    else props.dispatch(onlyNumbers(setState));
  };



  const handleChange = () => {

    if (!checked.includes("numeros")) {
      setChecked(['numeros'])
      setBtnCheck(!checked);
    }
    else {
      console.log("sdasasd")
      setBtnCheck(checked)
      setChecked(checked.filter(item => item !== "numeros"))
    }

    console.log(checked)
  }

  // <span>{props.data.image}</span>




  return (
    <Container>
    <Row xs={1} md={2}>

        <Col>
          <form onSubmit={onSubmit} className="forms">
            <div>
              <a>
                Solo numeros
              </a>
              <input type='checkbox' checked={btnCheck} onChange={(e) => handleChange()} value='numeros' >

              </input>
            </div>
            <div className='listaSuit'>
              <a>Por genero de carta</a>
              {Lists()}
            </div>


            <button type='submit' className='btn btn-primary btn-lg'
              aria-label="Increment value">
              CalcularNueva
            </button>
          </form>
        </Col>

        <Col className='imagenCol'>
          <div className='imagen'>

            <img src={props.data.image} />
          </div>
        </Col>
    </Row>
    </Container>
  );
}


const stateMapToPros = state => {

  return { data: state.random.result }

}


export default connect(stateMapToPros)(Result)

