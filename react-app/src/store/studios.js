import axios from 'axios'

const LOAD_STUDIOS = '/studios/load'
const CREATE_STUDIO = '/studios/create'
const UPDATE_STUDIO = '/studios/update'
const DELETE_STUDIO = '/studios/delete'

const loadStudios = (studios) => {
    return {
        type: LOAD_STUDIOS,
        studios
    }
}

export const createStudio = (studio) => {
    return {
        type: CREATE_STUDIO,
        studio
    }
}

export const updateStudio = (studio) => {
    return {
        type: UPDATE_STUDIO,
        studio
    }
}

const deleteStudio = (studio) => {
    return {
        type: DELETE_STUDIO,
        studio
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
        dispatch(loadStudios(data))
    } else {
        return 'error'
    }
}

export const createStudioThunk = (studio) => async (dispatch) => {
    const response = await fetch('/api/studios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studio)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createStudio(data))
    } else {
        const badData = await response.json()
        if(badData.errors) return badData.errors
    }
}

export const updateStudioThunk = (studio) => async (dispatch) => {
    const response = await fetch(`/api/studios/${studio.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studio)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateStudio(data))
    }
}

export const deleteStudioThunk = (studio) => async (dispatch) => {
    const response = await fetch(`/api/studios/${studio.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        dispatch(deleteStudio(studio))
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
        case CREATE_STUDIO: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.studio.studio.id] = action.studio.studio
            return newState
        }
        case UPDATE_STUDIO: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.studio.studio.id] = action.studio.studio
            return newState
        }
        case DELETE_STUDIO: {
            newState = JSON.parse(JSON.stringify(state))
            delete newState[action.studio.id]
            return newState
        }
        default:
            return state
    }
}
