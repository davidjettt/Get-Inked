import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteApptThunk } from "../../store/appointments"
import { deleteReviewThunk } from "../../store/reviews"
import { deleteStudioThunk, loadStudiosThunk } from "../../store/studios"
import { deleteTattooThunk, loadTattoosThunk } from "../../store/tattoos"
import './DeleteButton.css'

export default function DeleteButton({ studio, setShowModal, tattoo, review, appt }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async () => {
        if (studio) {
            await dispatch(deleteStudioThunk(studio))
            await dispatch(loadTattoosThunk())
            history.push('/studios')
        }
        else if (review) {
            await dispatch(deleteReviewThunk(review))
            await dispatch(loadStudiosThunk())
        }
        else if (appt) {
            await dispatch(deleteApptThunk(appt))
        }
        else {
            await dispatch(deleteTattooThunk(tattoo))
            await dispatch(loadStudiosThunk())
        }
    }

    const handleCancel = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className="delete-modal-main">
                <div className="delete-message-container">
                    Are you sure you want to delete?
                </div>
                <button onClick={handleDelete} className="yes-button" >Delete</button>
                <button onClick={handleCancel} className="no-button">Cancel</button>
            </div>
        </>
    )
}
