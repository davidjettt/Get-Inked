import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import threeDots from '../../Images/three-dots.svg'
import AppointmentOptions from "./AppointmentOptions";


export default function AppointmentOptionsModal({ apptId }) {
    const [ showOptionsModal, setShowOptionsModal ] = useState(false)
    const appt = useSelector(state => state.appointments[+apptId])
    // const sessionUserId = useSelector(state => state.session.user?.id)

    const handleClose = () => {
        setShowOptionsModal(false)
    }

    const handleClick = () => {
        setShowOptionsModal(true)
    }

    return (
        <>
            <img className="edit-tattoo-three-dots" src={threeDots} alt='' onClick={handleClick} />
            {showOptionsModal && <Modal onClose={handleClose}>
                <AppointmentOptions appt={{...appt}} setShowOptionsModal={setShowOptionsModal} />
            </Modal>}
        </>
    )
}
