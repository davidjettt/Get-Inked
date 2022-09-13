import { useState } from "react"
import { useSelector } from "react-redux"
import DeleteButton from "../DeleteButton/DeleteButton"
import EditReviewForm from './EditReviewForm'

export default function ReviewOptions({ reviewId, setShowOptionsModal }) {
    const [ showEditModal, setShowEditModal ] = useState(false)
    const [ showModal, setShowModal ] = useState(false)
    const review = useSelector(state => state.reviews[+reviewId])

    const handleClick = () => {
        setShowEditModal(true)
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
                    <button className="edit-tattoo-button" onClick={handleClick}>Edit review</button>
                    <button className="delete-tattoo-button" onClick={handleDeleteModal}>Delete review</button>
                    <button className="cancel-button" onClick={handleCancel} >Cancel</button>
                </div>}
            </div>
            {showEditModal && <EditReviewForm setShowOptionsModal={setShowOptionsModal} reviewId={reviewId} />}
            {showModal &&
                <DeleteButton review={{...review}} setShowModal={setShowModal} />
            }
        </>
    )
}
