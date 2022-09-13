

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { createReviewThunk } from '../../store/reviews'
import { loadStudiosThunk } from '../../store/studios'
import './ReviewForm.css'

export default function ReviewForm({ setOpenModal , studioId }) {
    const dispatch = useDispatch()
    const studio = useSelector(state => state.studios[+studioId])
    const [ studioReview, setStudioReview ] = useState('')
    const [ rating, setRating ] = useState('')
    const [ reviewImage, setReviewImage ] = useState('')
    const [ imagePreview, setImagePreview ] = useState(null)
    const [ errors, setErrors ] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formData = new FormData()
        formData.append('review', studioReview)
        formData.append('stars', rating / 20)
        formData.append('studio_id', +studioId)

        if (reviewImage) {
            formData.append('review_image', reviewImage)
        }

        const badData = await dispatch(createReviewThunk(formData))
        if (badData) {
            setErrors(badData)
        } else {
            await dispatch(loadStudiosThunk())
            setOpenModal(false)
        }
    }

    const updateReviewImage = (e) => {
        setErrors([])
        const allowedTypes = [ "png", "jpg", "jpeg", "gif", "webp" ]
        const file = e.target.files[0]

        if (file) {
            const fileType = allowedTypes.find(type => file.type.includes(type))

            if (fileType) {
                const reader = new FileReader()
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImagePreview(reader.result)
                        setReviewImage(file)
                    }
                }
                reader.readAsDataURL(file)
            } else {
                setErrors(['Not a valid image file type'])
            }
        }
    }

    const handleXButton = () => {
        setOpenModal(false)
    }

    const newRating = (rate) => {
        setRating(rate)
    }

    return (
        <>
            <div className='review-modal-main'>
                <div className='review-modal-title-container'>
                    <button className='create-review-x-button' onClick={handleXButton}>X</button>
                    <div className='review-form-title' >Write a review for { studio.name }</div>
                    <div></div>
                </div>
                <div className='review-form-message'>
                    A star rating and review are required.
                </div>
                <div className="errors-tattoo-form">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className='review-modal-form'>
                    <div className='review-form-star-container'>
                        <Rating
                            // className='user-review-stars'
                            ratingValue={rating}
                            size={25}
                            initialValue={0}
                            onClick={newRating}
                            fillColor='#1F2125'
                            transition={true}
                        />
                    </div>
                    <div className='review-form-review-container'>
                        <textarea
                            className='create-review-form-textarea'
                            cols='40'
                            rows='8'
                            placeholder='Write your review here...'
                            value={studioReview}
                            onChange={(e) => setStudioReview(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className='review-form-image-upload-container'>
                        <label htmlFor='input' className='custom-file-upload'>
                            <input
                                className='image-upload-input'
                                type='file'
                                onChange={updateReviewImage}
                                id='input'
                                accept='image/*'
                            />
                            Upload review image
                        </label>
                        <div className='review-form-image-preview-container'>
                            {imagePreview &&  <img className='review-form-image-preview' src={imagePreview}  alt='review' />}
                        </div>
                    </div>
                    <button className='tattoo-form-submit-button'>Submit Review</button>
                </form>
            </div>
        </>
    )
}
