import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudioThunk, updateAvatarThunk, updateHeaderThunk } from "../../store/studios";
import './EditStudioPics.css'

export default function EditStudioPics({ studioId }) {
    const [ errors, setErrors ] = useState([])
    const dispatch = useDispatch()
    const studio = useSelector(state => state.studios[+studioId])

    function isImgUrl(url) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    const submitAvatar = async (e) => {
        setErrors([])

        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = async () => {
                if (reader.readyState === 2) {
                    if (await isImgUrl(reader.result)) {
                        const formData = new FormData()
                        formData.append('avatar', file)

                        const data = await dispatch(updateAvatarThunk(formData, studio.id))
                        if (data) {
                            setErrors(data)
                        } else {
                            dispatch(getStudioThunk(studioId))
                            // window.alert('Successfully changed avatar image')
                        }
                    } else {
                        setErrors(['Invalid avatar image'])
                    }
                }
            }
            reader.readAsDataURL(file)
        }
    }
    const submitHeader = async (e) => {
        setErrors([])

        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = async () => {
                if (reader.readyState === 2) {
                    if (await isImgUrl(reader.result)) {
                        const formData = new FormData()
                        formData.append('header', file)

                        const data = await dispatch(updateHeaderThunk(formData, studio.id))
                        if (data) {
                            setErrors(data)
                        } else {
                            dispatch(getStudioThunk(studioId))
                        }
                    } else {
                        setErrors(['Invalid header image'])
                    }
                }
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <div className="errors-studio-form">
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
            </div>
            <div className="avatar-header-container">
                <div className="studio-form-avatar-container">
                    <label className="studio-form-custom-file-upload-avatar">
                        <input
                            className="studio-form-avatar-input"
                            name='avatar'
                            type="file"
                            accept="image/*"
                            onChange={(e) => submitAvatar(e)}
                        />
                        Change avatar image
                    </label>
                    <div className="studio-form-avatar-preview-container">
                        <img className="studio-form-avatar-preview" src={studio.avatar} alt='' />
                    </div>
                </div>
                <div className="studio-header-upload-container">
                    <label className="studio-form-custom-file-upload">
                        <input
                            className="studio-form-avatar-input"
                            name='header'
                            type="file"
                            accept="image/*"
                            onChange={(e) => submitHeader(e)}
                        />
                        Change header image
                    </label>
                    <div className="studio-form-header-preview-container">
                        <img className="studio-form-header-preview" src={studio.headerImage} alt='' />
                    </div>
                </div>
            </div>
        </>
    )
}
