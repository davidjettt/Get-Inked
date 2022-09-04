import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../../context/Modal'
import TattooForm from './TattooForm'


export default function TattooFormModal({ studioId }) {
    const [ showTattooFormModal, setShowTattooFormModal ] = useState(false)

    const handleShowModal = () => {
        setShowTattooFormModal(true)
    }

    return (
        <>
            <button onClick={handleShowModal}>Add images</button>
            {showTattooFormModal && <Modal onClose={() => setShowTattooFormModal(false)}>
                <TattooForm setShowTattooFormModal={setShowTattooFormModal} studioId={studioId} />
            </Modal>}
        </>
    )
}
