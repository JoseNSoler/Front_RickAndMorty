import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'


import reducer from './reducers'


import App from './containers/App'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PerNavbar from './components/PerNavbar'

import Character from './components/Character'

import Favorites from './components/Favorites'

import {PersistGate} from 'redux-persist/lib/integration/react';


import storage from 'redux-persist/lib/storage/session';

import {persistStore, persistReducer} from 'redux-persist';



import '../src/style.scss';


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const persistConfig = {
  key: 'root',
  storage
}


const myPersistReducer = persistReducer(persistConfig, reducer);

const store3 = createStore(
  myPersistReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)


const persistor3 = persistStore(store3)






ReactDOM.render(
  <BrowserRouter>
    <Provider store={store3}>
    <PersistGate loading={null} persistor={persistor3}>
      <PerNavbar/>
      <Routes>
        <Route path="/" element={<><h1>BIENVENIDO, PORFAVOR DELE CLICK EN UNIVERSO PARA TRAER TODOS LOS PERSONAJES, O CUENTA PARA VER LOS GUARDADOS</h1></>}/>
        <Route path="/all" element={<><App/></>}/>
        <Route path="/character" element={<><Character /></>}/>
        <Route path="/favorites" element={<><Favorites /></>}/>
        
      </Routes>
      </PersistGate>

    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
