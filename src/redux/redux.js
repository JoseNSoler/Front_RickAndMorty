import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers/index'
import {persistStore, persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { composeWithDevTools } from 'redux-devtools-extension'


import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

 const storageConfig = {
        key: 'root', // debe tener
                 storage: storageSession, // Mecanismo de caché
                 whitelist: ['allForOne'] // LOS DATOS ILURRTOS EN LOS DATOS DE PERSIENCIA
}



const myPersistReducer = persistReducer(storageConfig, reducer);
const store = createStore(myPersistReducer, composeWithDevTools(applyMiddleware(...middleware)) );
 

export const persistor = persistStore(store)
export default store;