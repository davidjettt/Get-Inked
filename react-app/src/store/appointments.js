const GET_APPT = 'appointments/getOne'
const LOAD_APPTS = '/appointments/load'
const CREATE_APPT = '/appointments/create'
const UPDATE_APPT = '/appointments/update'
const DELETE_APPT = '/appointments/delete'

const getOneAppointment = (appt) => {
    return {
        type: GET_APPT,
        appt
    }
}

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
        return dispatch(createAppt(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData
    }
}

export const updateApptThunk = (appt, apptId) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${apptId}`, {
        method: 'PUT',
        body: appt
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateAppt(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const deleteApptThunk = (appt) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${appt.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteAppt(appt))
    }
}

export const updateImgRefs = (formData, apptId) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${apptId}/images`, {
        method: 'PUT',
        body: formData
    })
    if (response.ok) {
        return
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const deleteImgRefs = (appt) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${appt.id}/images/remove`, {
        method: 'PUT'
    })

    if (response.ok) return
}

export const postAppointmentImageThunk = (imageData, apptId) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${apptId}/images`, {
        method: 'POST',
        body: imageData
    })

    if (response.ok) {
        return
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const deleteAppointmentImageThunk = (imageId) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${imageId}/images`, {
        method: 'DELETE'
    })

    if (response.ok) {
        return
    }
}

// Fetches the appointment with the updated image references
export const getOneAppointmentThunk = (apptId) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${apptId}/one`)
    const data = await response.json()
    return dispatch(getOneAppointment(data))
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
            newState[action.appt.appointment.id] = action.appt.appointment
            return newState
        }
        case UPDATE_APPT: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.appt.appointment.id] = action.appt.appointment
            return newState
        }
        case DELETE_APPT: {
            newState = JSON.parse(JSON.stringify(state))
            delete newState[action.appt.id]
            return newState
        }
        case GET_APPT: {
            newState = JSON.parse(JSON.stringify(state))
            newState[action.appt.appointment.id] = action.appt.appointment
            return newState
        }
        default:
            return state
    }
}
