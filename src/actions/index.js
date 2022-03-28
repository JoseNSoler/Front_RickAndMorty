import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://rickandmortyapi.com/api/",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });

  export const delCharacter= (item) => (dispatch) => {
    console.log(item)

    return dispatch({type:"DelFav", fav: item})
} 




export const characterFav = (character, allFavs) => (dispatch) => {
    console.log(allFavs)
    return dispatch({type:"AddFav", fav: character, allFav: allFavs})
}  




export const characterInfo = (character, dataAll) => (dispatch) => {

    return dispatch({type:"Character", char: character, data: dataAll})
}  




export const page = (state, url) => (dispatch) => {
    const alive = async () => {
        const res = await axiosInstance.get(url);
        return res
    }

    return alive().then((resp) => { dispatch({ type: "Page", data: resp.data }) })
    .catch((e) => {
        console.error(e);
    })
}


export const filterMany = (state, filter) => (dispatch) => {

    if (filter[1] === undefined) var stringSearch = `character/?status=${filter[0]}`
    if (filter[0] === undefined) var stringSearch = `character/?gender=${filter[1]}`

    if (filter[1] && filter[0]) var stringSearch = `character/?status=${filter[0]}&gender=${filter[1]}`


    const alive = async () => {
        const res = await axiosInstance.get(stringSearch);
        return res
    }

    return alive().then((resp) => { dispatch({ type: "FilterMany", data: resp.data }) })
    .catch((e) => {
        console.error(e);
    })

}



export const filterAlive = (state, filter) => (dispatch) => {
    console.log(filter)

    const alive = async () => {
        const res = await axiosInstance.get('character/?status=' + filter);
        return res
    }

    return alive().then((resp) => { dispatch({ type: "FilterAlive", data: resp.data }) })
    .catch((e) => {
        console.error(e);
    })

}

export const getAllCharacters = (state) => (dispatch) => {
    const getAllChar = async () => {
        try {
            const resp = await axiosInstance.get('character');
            
            dispatch({ type: "All", data: resp.data })
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    return getAllChar()
}




export const fetchRandom = (state) => (dispatch) => {

    return fetch(`http://localhost:8080/cards/random`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        } // body data type must match "Content-Type" header
    }).then(response => response.json())
      .then(json => {
          dispatch({ type: "Random", data: json });
        })
}

export const onlyNumbers = (state) => (dispatch) => {
    return fetch(`http://localhost:8080/cards/onlyNumbers`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        } // body data type must match "Content-Type" header
    }).then(response => response.json())
      .then(json => {
          dispatch({ type: "Numbers", data: json });
        })
}


export const onlySuit = (state, change, numero) => (dispatch) => {

    console.log(numero)
    
    return fetch(`http://localhost:8080/cards/suit/${encodeURIComponent(change["value"])}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        } // body data type must match "Content-Type" header
    }).then(response => response.json())
      .then(json => {
          dispatch({ type: "Suit", data: json });
        })
        
}


export const suitAndNumber = (state, numero, listChecked) => (dispatch) => {

    
    var bool = (numero !== false)
    console.log(listChecked)
    
    return fetch(`http://localhost:8080/cards/querySuitNumber/?suit=${encodeURIComponent(listChecked["value"])}&number=${encodeURIComponent( bool)}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        } // body data type must match "Content-Type" header
    }).then(response => response.json())
      .then(json => {
          dispatch({ type: "SuitNumber", data: json });
        })
        
        
}
