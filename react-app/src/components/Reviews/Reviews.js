import { Rating } from 'react-simple-star-rating';
import { useSelector } from "react-redux"
import './Reviews.css'

export default function Reviews({ studioId }) {
    const defaultUserProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const reviews = useSelector(state => Object.values(state.reviews).filter(review => +studioId === +review.studioId))


    return (
        <>
            <div className="reviews-main">
                <div className="reviews-header-container">
                    <h2>Reviews</h2>
                </div>
                <div className="reviews-container">
                    {reviews.map((review) => (
                        <div key={review.id} className="user-review-main">
                            <div className="user-info-review">
                                <img className="review-profile-image" src={defaultUserProfilePic} alt='' />
                                <div className='stars-user-name'>
                                    <Rating
                                            // className='user-review-stars'
                                            size={20}
                                            ratingValue={review.stars * 20}
                                            // initialValue={0}
                                            // onClick={newRating}
                                            fillColor='#1F2125'
                                            readonly={true}
                                            // transition={true}
                                        />
                                    <span>{review.user.name}</span>
                                </div>
                            </div>
                            <div className="review">
                                <div>{review.review}</div>
                                <div>
                                    {review.reviewImage &&
                                    <img className="review-image" src={review.reviewImage}  alt='review' />}
                                </div>
                            </div>
                            {/* <div></div> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
