import axios from 'axios'

const LOAD_STUDIOS = '/studios/load'

const loadStudios = (studios) => {
    return {
        type: LOAD_STUDIOS,
        studios
    }
}

export const loadStudiosThunk = () => async (dispatch) => {
    // try {
    //     const response = await axios.get('/api/studios/')
    //     console.log(response)
    //     dispatch(loadStudios(response))
    // }
    // catch(e){
    //     return e
    // }
    const response = await fetch('/api/studios/')
    if (response.ok) {
        const data = await response.json()
        console.log('DATA', data)
        dispatch(loadStudios(data))
    } else {
        return 'error'
    }

}

const initialState = {}

export default function studioReducer(state = initialState, action) {
    let newState
    switch(action.type) {
        case LOAD_STUDIOS: {
            newState = JSON.parse(JSON.stringify(state))
            action.studios.allStudios.forEach((studio) => {
                newState[studio.id] = studio
            })
            return newState
        }
        default:
            return state
    }
}
