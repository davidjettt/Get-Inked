import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudioThunk, updateAvatarThunk, updateHeaderThunk } from "../../store/studios";
import './EditStudioPics.css'

export default function EditStudioPics({ studioId }) {
    const [ errors, setErrors ] = useState([])
    const dispatch = useDispatch()
    const studio = useSelector(state => state.studios[+studioId])


    const isImage = (url) => {
        return /\.(jpg|jpeg|png|webp|gif|pdf)$/.test(url);
    }

    const submitAvatar = async (e) => {
        setErrors([])

        // let file
        // if (e.target.files[0]) {
        //     file = e.target.files[0]
        //     console.log(file)
        // }

        const file = e.target.files[0]

        if (file) {
            const formData = new FormData()
            formData.append('avatar', file)

            const data = await dispatch(updateAvatarThunk(formData, studio.id))
            console.log('DATA', data)
            if (data) {
                setErrors(data)
            } else {
                dispatch(getStudioThunk(studioId))
            }
        }

        // if (isImage(file?.name)) {
        //     console.log('HERE')
        //     const formData = new FormData()
        //     formData.append('avatar', file)

        //     dispatch(updateAvatarThunk(formData, studio.id))
        //         .then(() => dispatch(getStudioThunk(studioId)))
        // } else {
        //     console.log('NOT IMAGE')
        //     setErrors(['Not a valid avatar image file type'])
        // }
    }
    const submitHeader = async (e) => {
        setErrors([])

        const file = e.target.files[0]

        if (file) {
            const formData = new FormData()
            formData.append('header', file)

            const data = await dispatch(updateHeaderThunk(formData, studio.id))
            console.log('DATA', data)
            if (data) {
                setErrors(data)
            } else {
                dispatch(getStudioThunk(studioId))
            }
        }
        // let file
        // if (e.target.files[0]) {
        //     file = e.target.files[0]
        //     console.log(file)
        // }
        // if (isImage(file.name)) {
        //     console.log('HERE')
        //     const formData = new FormData()
        //     formData.append('header', file)

        //     dispatch(updateHeaderThunk(formData, studio.id))
        //         .then(() => dispatch(getStudioThunk(studioId)))
        // } else {
        //     console.log('NOT IMAGE')
        //     setErrors(['Not a valid header image file type'])
        // }
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
