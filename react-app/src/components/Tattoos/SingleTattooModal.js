import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../../context/Modal'
import SingleTattoo from './SIngleTattoo'


export default function SingleTattooModal({ tattooId }) {
    const [ showModal, setShowModal ] = useState(false)
    const tattoo = useSelector(state => Object.values(state.tattoos).find(tattoo => +tattoo.id === +tattooId))

    const handleShowModal = () => {
        setShowModal(true)
    }

    return (
        <>
            <div onClick={handleShowModal}>
                <img src={tattoo.imageUrl} alt='tattoo' />
            </div>
            {showModal && <Modal onClose={() => setShowModal(false)}>
                <SingleTattoo tattooId={tattooId} />
            </Modal>}
        </>
    )
}
