import { useDispatch } from "react-redux"
import { deleteAppointmentImageThunk, getOneAppointmentThunk } from "../../store/appointments"



export default function EditApptRemoveImg({ imgId, apptId, setImgPreviews }) {
    const dispatch = useDispatch()
    const handleClick = async () => {
        await dispatch(deleteAppointmentImageThunk(imgId))
        const updatedAppt = await dispatch(getOneAppointmentThunk(apptId))
        setImgPreviews(updatedAppt.appt.appointment.apptImages)
    }

    return (
        <>
            <button className="remove-image-btn" type='button' onClick={handleClick}>X</button>
        </>
    )
}
