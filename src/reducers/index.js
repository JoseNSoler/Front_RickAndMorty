//reducers
import { combineReducers } from 'redux'

const initialState = {
    result: {},
    user:[],
    character:{}
};


function allForOne(state = initialState, action) {
    switch (action.type) {
        case "All": {
            console.log("entramos a alll")
            return {...state, result: action.data }
        }
        case "FilterAlive": {
            return { ...state, result: action.data}
        }
        case "FilterMany": {
            return { ...state, result: action.data}
        }
        case "Page": {
            return { ...state, result: action.data}
        }
        case "DelFav": {
            console.log(action.fav)
            return { ...state, user: state.user.filter( char => char !== action.fav )}
        }
        case "AddFav": {
            // (state.user.includes(action.fav) ? state.user.filter( char => char !== action.fav ) : [...state.user, action.fav])
            console.log(action.allFav)
            console.log("assdaasdasdsad")
        
            if(state.user === undefined) return { ...state, user: [action.fav]}
            if(state.user !== undefined) return  { ...state, user: (state.user.includes(action.fav) ? state.user.filter( char => char !== action.fav ) : [...state.user, action.fav]) }
   
        }
        case "Character": {
            return {
                ...state,
                character: action.char,
                result: action.data
            }
        }


        default: return state
    }
}




const rootReducer = combineReducers({
    allForOne
})

export default rootReducer