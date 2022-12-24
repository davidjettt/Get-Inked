import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { useHistory } from "react-router-dom"
// import { loadStudiosThunk } from "../../store/studios"
// import { deleteTattooThunk } from "../../store/tattoos"
import DeleteButton from "../DeleteButton/DeleteButton"
import EditTattooForm from "./EditTattooForm"
import './TattooOptions.css'

export default function TattooOptions({ tattooId, setShowTattooOptionsModal }) {
    // const dispatch = useDispatch()
    // const history = useHistory()
    const [ showEditTattooModal, setShowTattooEditModal ] = useState(false)
    const [ showModal, setShowModal ] = useState(false)
    const tattoo = useSelector(state => state.tattoos[+tattooId])

    const handleTattooOptionsModal = () => {
        setShowTattooOptionsModal(false)
    }

    const handleClick = () => {
        setShowTattooEditModal(true)
    }

    // const handleTattooDelete = () => {
    //     dispatch(deleteTattooThunk(tattoo))
    //     dispatch(loadStudiosThunk())
    // }

    const handleDeleteModal = () => {
        setShowModal(true)
    }


    return (
        <>
            <div className="tattoo-options-modal-main">
                {!showEditTattooModal && !showModal && <div className="tattoo-options-modal-buttons-container">
                    <button className="edit-tattoo-button" onClick={handleClick}>Edit description</button>
                    <button className="delete-tattoo-button" onClick={handleDeleteModal}>Delete tattoo</button>
                    <button className="cancel-button" onClick={handleTattooOptionsModal} >Cancel</button>
                </div>}
            </div>
            {showEditTattooModal && <EditTattooForm setShowTattooOptionsModal={setShowTattooOptionsModal} tattooId={tattooId} />}
            {showModal &&
                <DeleteButton tattoo={{...tattoo}} setShowModal={setShowModal} />
            }
        </>
    )
}
