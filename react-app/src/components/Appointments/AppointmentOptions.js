import { useState } from "react"
import { useHistory } from "react-router-dom"
import DeleteButton from "../DeleteButton/DeleteButton"
import EditAppointmentForm from "./EditAppointmentForm"

export default function AppointmentOptions({ appt, setShowOptionsModal }) {
    const history = useHistory()
    const [ showEditModal, setShowEditModal ] = useState(false)
    const [ showModal, setShowModal ] = useState(false)

    const handleClick = () => {
        setShowEditModal(false)
        history.push(`/appointments/${appt.id}/edit`)
    }

    const handleCancel = () => {
        setShowOptionsModal(false)
    }

    const handleDeleteModal = () => {
        setShowModal(true)
    }

    return (
        <>
            <div className="tattoo-options-modal-main">
                {!showEditModal && !showModal && <div className="tattoo-options-modal-buttons-container">
                    <button className="edit-tattoo-button" onClick={handleClick}>Edit appointment</button>
                    <button className="delete-tattoo-button" onClick={handleDeleteModal}>Delete appointment</button>
                    <button className="cancel-button" onClick={handleCancel} >Cancel</button>
                </div>}
            </div>
            {showEditModal && <EditAppointmentForm setShowOptionsModal={setShowOptionsModal} appt={{...appt}} />}
            {showModal &&
                <DeleteButton appt={{...appt}} setShowModal={setShowModal} />
            }
        </>
    )
}
