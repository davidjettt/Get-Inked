const LOAD_TATTOOS = 'tattoos/load'

const loadTattoos = (tattoos) => {
    return {
        type: LOAD_TATTOOS,
        tattoos
    }
}

export const loadTattoosThunk = () => async (dispatch) => {
    const response = await fetch('/api/tattoos/')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadTattoos(data))
    }
}


const initialState = {}
export default function tattoosReducer (state = initialState, action) {
    let newState
    switch(action.type) {
        case LOAD_TATTOOS: {
            newState = JSON.parse(JSON.stringify(state))
            action.tattoos.allTattoos.forEach((tattoo) => {
                newState[tattoo.id] = tattoo
            })
            return newState
        }
        default:
            return state
    }
}
