const LOAD_TATTOOS = 'tattoos/load'
const CREATE_TATTOO = 'tattoos/create'
const UPDATE_TATTOO = 'tattoos/update'
const DELETE_TATTOO = 'tattoos/delete'
const BOOKMARK_TATTOO = 'tattoos/bookmark'
const UNBOOKMARK_TATTOO = 'tattoos/unbookmark'

const loadTattoos = (tattoos) => {
    return {
        type: LOAD_TATTOOS,
        tattoos
    }
}

const createTattoo = (tattoo) => {
    return {
        type: CREATE_TATTOO,
        tattoo
    }
}

const updateTattoo = (tattoo) => {
    return {
        type: UPDATE_TATTOO,
        tattoo
    }
}

const deleteTattoo = (tattoo) => {
    return {
        type: DELETE_TATTOO,
        tattoo
    }
}

const bookmarkTattoo = (tattoo) => {
    return {
        type: BOOKMARK_TATTOO,
        tattoo
    }
}

export const loadTattoosThunk = () => async (dispatch) => {
    const response = await fetch('/api/tattoos/')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadTattoos(data))
    }
}

export const createTattooThunk = (tattoo, studioId) => async (dispatch) => {
    const response = await fetch(`/api/studios/${studioId}/tattoos`, {
        method: 'POST',
        body: tattoo
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createTattoo(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const updateTattooThunk = (tattoo) => async (dispatch) => {
    const response = await fetch(`/api/tattoos/${tattoo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tattoo)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateTattoo(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const deleteTattooThunk = (tattoo) => async (dispatch) => {
    const response = await fetch(`/api/tattoos/${tattoo.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        dispatch(deleteTattoo(tattoo))
    }
}

// export const bookmarkTattooThunk = (tattooId) => async (dispatch) => {
//     const response = await fetch(`/api/tattoos/${tattooId}/bookmark`, {
//         method: 'POST'
//     })


// }

const initialState = {}
export default function tattoosReducer (state = initialState, action) {
    let newState
    switch(action.type) {
        case LOAD_TATTOOS: {
            // newState = JSON.parse(JSON.stringify(state))
            newState = {}
            action.tattoos.allTattoos.forEach((tattoo) => {
                newState[tattoo.id] = tattoo
            })
            return newState
        }
        case CREATE_TATTOO: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.tattoo.tattoo.id] = action.tattoo.tattoo
            return newState
        }
        case UPDATE_TATTOO: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.tattoo.tattoo.id] = action.tattoo.tattoo
            return newState
        }
        case DELETE_TATTOO: {
            newState = JSON.parse(JSON.stringify(state))
            delete newState[action.tattoo.id]
            return newState
        }
        default:
            return state
    }
}
