import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../../context/Modal'
import SingleTattoo from './SIngleTattoo'
import './Tattoos.css'
import '../../context/Modal.css'

export default function SingleTattooModal({ tattooId, studioPortfolio, small, medium }) {
    const cardClasses = [ 'small', 'medium', 'large' ]
    const [ showModal, setShowModal ] = useState(false)
    const tattoo = useSelector(state => Object.values(state.tattoos).find(tattoo => +tattoo.id === +tattooId))

    const handleShowModal = () => {
        setShowModal(true)
    }

    const randomClass = cardClasses[Math.floor(Math.random() * cardClasses.length)]

    return (
        <>
            <div className={studioPortfolio ? 'studio-portfolio-image-container' : `tattoo-card ${small || medium}`} onClick={handleShowModal}>
                <img className={studioPortfolio ? 'studio-portfolio-image' : 'tattoo-image'} src={tattoo.imageUrl} alt='tattoo' />
            </div>
            {showModal && <Modal closeTimeoutMS={500} onClose={() => setShowModal(false)}>
                <SingleTattoo studioPortfolio={studioPortfolio} tattooId={tattooId} />
            </Modal>}
        </>
    )
}
