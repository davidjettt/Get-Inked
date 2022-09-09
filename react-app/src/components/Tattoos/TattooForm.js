import { useState } from "react"
import { useDispatch } from "react-redux"
import { loadStudiosThunk } from "../../store/studios"
import { createTattooThunk } from "../../store/tattoos"
import './TattooForm.css'


export default function TattooForm({ studioId, setShowTattooFormModal }) {
    const dispatch = useDispatch()
    const [ tattooStyle, setTattooStyle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ tattooImage, setTattooImage ] = useState('')
    const [ tattooPreview, setTattooPreview ] = useState(null)
    const [ errors, setErrors ] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formData = new FormData()
        formData.append('tattoo_style', tattooStyle)
        formData.append('description', description)
        formData.append('image_url', tattooImage)
        formData.append('studio_id', studioId)

        const badData = await dispatch(createTattooThunk(formData, studioId))
        if (badData) {
            setErrors(badData)
        } else {
            await dispatch(loadStudiosThunk())
            setShowTattooFormModal(false)
        }
    }

    // const isImage = (url) => {
    //     return /\.(jpg|jpeg|png|webp|gif|pdf)$/.test(url);
    // }

    const updateTattooImage = (e) => {
        setErrors([])
        const allowedTypes = [ "png", "jpg", "jpeg", "gif", "webp" ]
        const file = e.target.files[0];

        if (file) {
            const fileType = allowedTypes.find(type => file.type.includes(type))

            if (fileType) {
                const reader = new FileReader()
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setTattooPreview(reader.result)
                        setTattooImage(file)
                    }
                }
                reader.readAsDataURL(file)
            } else {
                setErrors(['Not a valid image file type'])
            }
        }
    }

    const handleXButton = () => {
        setShowTattooFormModal(false)
    }

    return (
        <div className="tattoo-form-main">
            <div className="tattoo-form-header-container">
                <div>
                    <button onClick={handleXButton} className="x-button">X</button>
                </div>
                <h3 className="tattoo-form-title">Add a tattoo</h3>
                <div></div>
            </div>
            <form onSubmit={handleSubmit} className="tattoo-form">
                <div className="studio-all-fields-required">
                    All fields are required.
                </div>
                <div className="errors-tattoo-form">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="tattoo-style-input-container">
                    <label className="custom">
                        <input
                            style={{ width: 340 }}
                            type='text'
                            value={tattooStyle}
                            onChange={(e) => setTattooStyle(e.target.value)}
                        />
                        <span className="placeholder">Tattoo Style</span>
                    </label>
                </div>
                <div className="tattoo-form-description-container">
                    <label className="custom-textarea">
                        <textarea
                            className="tattoo-form-textarea"
                            placeholder="Tattoo description here..."
                            cols='50'
                            rows='10'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                        {/* <span className="placeholder-textarea">Description</span> */}
                    </label>
                </div>
                <div className="tattoo-form-image-upload-container">
                    <label htmlFor="input" className="custom-file-upload">
                        <input
                            className="image-upload-input"
                            id='input'
                            type='file'
                            accept="image/*"
                            onChange={updateTattooImage}
                        />
                        Upload image
                    </label>
                </div>
                <div className="tattoo-form-image-preview-container">
                    {tattooPreview && <img className="tattoo-form-image-preview" src={tattooPreview} alt='' />}
                </div>
                <button className="tattoo-form-submit-button">Submit</button>
            </form>
        </div>
    )
}
