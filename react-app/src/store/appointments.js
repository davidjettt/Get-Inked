const LOAD_APPTS = '/appointments/load'
const CREATE_APPT = '/appointments/create'
const UPDATE_APPT = '/appointments/update'
const DELETE_APPT = '/appointments/delete'

const loadAppts = (appts) => {
    return {
        type: LOAD_APPTS,
        appts
    }
}

const createAppt = (appt) => {
    return {
        type: CREATE_APPT,
        appt
    }
}

const updateAppt = (appt) => {
    return {
        type: UPDATE_APPT,
        appt
    }
}

const deleteAppt = (appt) => {
    return {
        type: DELETE_APPT,
        appt
    }
}

export const loadApptsThunk = () => async (dispatch) => {
    const response = await fetch('/api/appointments/')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadAppts(data))
    }
}

export const createApptThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/appointments/', {
        method: 'POST',
        body: formData
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createAppt(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

const initialState = {}

export default function appointmentsReducer(state = initialState, action) {
    let newState
    switch(action.type) {
        case LOAD_APPTS: {
            newState = {}
            action.appts.allAppointments.forEach((appt) => {
                newState[appt.id] = appt
            })
            return newState
        }
        case CREATE_APPT: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.appt.id] = action.appt
            return newState
        }
        case UPDATE_APPT: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.appt.id] = action.appt
            return newState
        }
        case DELETE_APPT: {
            newState = JSON.parse(JSON.stringify(state))
            delete newState[action.appt.id]
            return newState
        }
        default:
            return state
    }
}
