import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom"
import { updateTattooThunk } from "../../store/tattoos"
import './EditTattooForm.css'

export default function EditTattooForm({ tattooId, setShowTattooOptionsModal }) {
    const defaultUserProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const sessionUser = useSelector(state => state.session.user)
    const sesssionUserAvatar = sessionUser.avatar
    const tattoo = useSelector(state => state.tattoos[+tattooId])
    const dispatch = useDispatch()

    const [ description, setDescription ] = useState(tattoo.description)
    const [ errors, setErrors ] = useState([])

    const handleCancelClick = () => {
        setShowTattooOptionsModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            id: tattoo.id,
            description: description,
            tattoo_style: tattoo.tattooStyle
        }
        // console.log('PAYLOAD', payload)

        const badData = await dispatch(updateTattooThunk(payload))
        if (badData) {
            setErrors(badData)
        } else {
            setShowTattooOptionsModal(false)
        }
    }


    if (!sessionUser) return <Redirect to='/' />

    return (
        <>
            <form onSubmit={handleSubmit} className="edit-tattoo-form-main">
                <div className="edit-tattoo-form-header-container">
                    <div className="edit-tattoo-cancel-button-container">
                        <button onClick={handleCancelClick} className="edit-tattoo-cancel-button">Cancel</button>
                    </div>
                    <div className="edit-tattoo-title-container">
                        Edit Tattoo Description
                    </div>
                    <div className="edit-tattoo-submit-button-container">
                        <button className="edit-tattoo-submit-button">Done</button>
                    </div>
                </div>
                <div className="edit-tattoo-form-and-image-container">
                    <div className="edit-tattoo-image-container">
                        <img className="edit-tattoo-image" src={tattoo.imageUrl} alt='' />
                    </div>
                    <div className="edit-tattoo-form-container">
                        <div className="edit-tattoo-user-info-container">
                            <div className="edit-tattoo-avatar-container">
                                <img className="single-post-profile-image" src={defaultUserProfilePic} alt='' />
                                <span>{tattoo.owner}</span>
                            </div>
                        </div>
                        <div className="edit-tattoo-textarea-container" >
                            <textarea
                                className="edit-tattoo-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Description'
                                cols='30'
                                rows='50'
                            >
                            </textarea>
                        </div>
                        <div>
                            {errors.length > 0 && errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
