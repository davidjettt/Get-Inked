import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import threeDots from '../../Images/three-dots.svg'
import ReviewOptions from "./ReviewOptions";


export default function ReviewOptionsModal({ reviewId }) {
    const [ showOptionsModal, setShowOptionsModal ] = useState(false)
    const reviewOwnerId = useSelector(state => state.reviews[+reviewId]?.userId)
    const sessionUserId = useSelector(state => state.session.user?.id)

    const handleClose = () => {
        setShowOptionsModal(false)
    }

    const handleClick = () => {
        setShowOptionsModal(true)
    }

    return (
        <>
            {reviewOwnerId === sessionUserId && <img className="edit-tattoo-three-dots" src={threeDots} alt='' onClick={handleClick} />}
            {showOptionsModal && <Modal onClose={handleClose}>
                <ReviewOptions reviewId={reviewId} setShowOptionsModal={setShowOptionsModal} />
            </Modal>}
        </>
    )
}
