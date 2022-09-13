import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { updateReviewThunk } from '../../store/reviews'
import { loadStudiosThunk } from '../../store/studios'

export default function EditReviewForm({ reviewId, setShowOptionsModal }) {
    const dispatch = useDispatch()
    const review = useSelector(state => state.reviews[+reviewId])
    const [ rating, setRating ] = useState(review.stars * 20)
    const [ studioReview, setStudioReview ] = useState(review.review)
    const [ errors, setErrors ] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id: review.id,
            review: studioReview,
            stars: rating / 20,
        }

        const badData = await dispatch(updateReviewThunk(payload))
        if (badData) {
            setErrors(badData)
        } else {
            await dispatch(loadStudiosThunk())
            setShowOptionsModal(false)
        }
    }

    const handleXButton = () => {
        setShowOptionsModal(false)
    }

    const newRating = (rate) => {
        setRating(rate)
    }

    return (
        <>
            <div className="edit-review-main">
                <div className="edit-review-header-container">
                    <button onClick={handleXButton}>X</button>
                    <h2>Edit Review</h2>
                    <div>
                        All fields are required.
                    </div>
                </div>
                <div className="errors-tattoo-form">
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="edit-review-stars-container">
                    <Rating
                            // className='user-review-stars'
                            ratingValue={rating}
                            size={20}
                            initialValue={0}
                            onClick={newRating}
                            fillColor='#1F2125'
                            transition={true}
                        />
                    </div>
                    <div className='edit-review-textarea-container'>
                        <textarea
                            placeholder='Write your review here...'
                            value={studioReview}
                            onChange={(e) => setStudioReview(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <button>Update Review</button>
                </form>
            </div>
        </>
    )
}
