import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";



export default function ReviewFormModal({ studioId }) {
    const [ openModal, setOpenModal ] = useState(false)


    const handleOpenModal = () => {
        setOpenModal(true)
    }


    return (
        <>
            <button onClick={handleOpenModal}>Write a review</button>
            {openModal && <Modal onClose={() => setOpenModal(false)}>
                <ReviewForm setOpenModal={setOpenModal} studioId={studioId} />
            </Modal>}
        </>
    )
}
