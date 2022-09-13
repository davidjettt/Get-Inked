import { useState } from "react";
import { Modal } from "../../context/Modal";
import threeDots from '../../Images/three-dots.svg'
import ReviewOptions from "./ReviewOptions";


export default function ReviewOptionsModal({ reviewId }) {
    const [ showOptionsModal, setShowOptionsModal ] = useState(false)

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
                <ReviewOptions reviewId={reviewId} setShowOptionsModal={setShowOptionsModal} />
            </Modal>}
        </>
    )
}
