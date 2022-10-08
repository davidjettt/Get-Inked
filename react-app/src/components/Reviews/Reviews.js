import { Rating } from 'react-simple-star-rating';
import { useSelector } from "react-redux"
import './Reviews.css'
import ReviewFormModal from './ReviewFormModal';
import ReviewOptionsModal from './ReviewOptionsModal';
import ReviewsModal from '../ReviewsModal/ReviewsModal';

export default function Reviews({ studioId }) {
    const defaultUserProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const reviews = useSelector(state => Object.values(state.reviews)
                    .filter(review => +studioId === +review.studioId).reverse())
    const sessionUserId = useSelector(state => state.session.user.id)
    const studioOwnerId = useSelector(state => state.studios[+studioId].ownerId)

    let firstThreeReviews = []

    if (reviews.length > 3) {
        for (let i = 0; i < 3; i++) {
            if (reviews.length) {
                firstThreeReviews.push(reviews[i])
            }
        }
    } else {
        firstThreeReviews = [...reviews]
    }


    // console.log(firstThreeReviews)


    return (
        <>
            <div className="reviews-main">
                <div className="reviews-header-container">
                    <h2>Reviews ({reviews.length})</h2>
                    <div className='reviews-btns-container'>
                        {studioOwnerId !== sessionUserId && <ReviewFormModal studioId={studioId} />}
                        <ReviewsModal reviewsComponent={true} reviews={reviews} />
                    </div>
                </div>
                <div className="reviews-container">
                    {firstThreeReviews.length > 0 && firstThreeReviews?.map((review) => (
                        <div key={review?.id} className="user-review-main">
                            <div className="user-info-review">
                                <img className="review-profile-image" src={defaultUserProfilePic} alt='' />
                                <div className='stars-user-name'>
                                    <Rating
                                            // className='user-review-stars'
                                            size={20}
                                            ratingValue={review?.stars * 20}
                                            // initialValue={0}
                                            // onClick={newRating}
                                            fillColor='#1F2125'
                                            readonly={true}
                                            // transition={true}
                                        />
                                    <span>{review?.user.name}</span>
                                </div>
                            </div>
                            <div className="review">
                                <div>{review?.review}</div>
                                <div>
                                    {review?.reviewImage &&
                                    <img className="review-image" src={review?.reviewImage}  alt='review' />}
                                </div>
                            </div>
                            <div className='review-options-container'>
                                <ReviewOptionsModal reviewId={review?.id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
