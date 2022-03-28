import React, { Component } from 'react'
import Result from '../components/Result'
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import PerNavbar from '../components/PerNavbar'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Section from '../components/Section'

import { createHashHistory } from 'history';



class App extends Component {// component stateful
  
  render() {
    return (<>
          <Section/>
    </>)
  }
}

export default App


/*
<div className='main center-block container-fluid'>
        <h3 className='title'>Generar carta al azar</h3>
          <Result />
        </div>
*/

