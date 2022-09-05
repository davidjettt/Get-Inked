import { useState } from "react";
import { Modal } from "../../context/Modal";
import threeDots from '../../Images/three-dots.svg'
import TattooOptions from "./TattooOptions";


export default function TattooOptionsModal({ tattooId }) {
    const [ showTattooOptionsModal, setShowTattooOptionsModal ] = useState(false)

    const handleClose = () => {
        setShowTattooOptionsModal(false)
    }

    const handleClick = () => {
        setShowTattooOptionsModal(true)
    }

    return (
        <>
            <img className="edit-tattoo-three-dots" src={threeDots} alt='' onClick={handleClick} />
            {showTattooOptionsModal && <Modal onClose={handleClose}>
                <TattooOptions setShowTattooOptionsModal={setShowTattooOptionsModal} tattooId={tattooId} />
            </Modal>}
        </>
    )
}
