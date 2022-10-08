import Modal from 'react-modal'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './ReviewsModal.css'
import { Rating } from 'react-simple-star-rating'
import ReviewOptionsModal from '../Reviews/ReviewOptionsModal';
import cancelXBtn from '../../Images/cancel-x-button.svg'

const customStyles = {
    content: {
        position: 'absolute',
        right: 0,
        height: '97vh',
        width: 460
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 104
    }
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root');



export default function ReviewsModal({ studioId, reviews, reviewsComponent }) {
    let subtitle;
    const defaultUserProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const [modalIsOpen, setIsOpen] = useState(false);
    const reviewsReversed = useSelector(state => Object.values(state.reviews)
                                .filter(review => +studioId === +review.studioId).reverse())

    if (!reviews) {
        reviews = reviewsReversed
    }


    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
        subtitle.style.color = 'black';
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            {reviewsComponent ? <button className='reviews-view-all-btn' onClick={openModal}>
                View all
            </button> :
            <button className='reviews-modal-btn' onClick={openModal}>
                See all reviews ({reviews.length})
            </button> }
            <Modal
                className='reviews-modal'
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Reviews Modal"
                // closeTimeoutMS={300}
            >
            <div className='reviews-modal-header-container'>
                <h2 style={{fontWeight: 550, fontSize: 18, letterSpacing: 1}} ref={(_subtitle) => (subtitle = _subtitle)}>Reviews</h2>
                <img className='reviews-modal-x-button' src={cancelXBtn} alt='x' onClick={closeModal} />
            </div>
            <div className='reviews-modal-main'>
                <div className='reviews-modal-content'>
                    {reviews.map((review) => (
                        <div key={review.id} className="user-review-modal-main">
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
                                <div className="modal-review">
                                    <div>{review.review}</div>
                                    <div>
                                        {review.reviewImage &&
                                        <img className="review-image" src={review.reviewImage}  alt='review' />}
                                    </div>
                                </div>
                                <div className='modal-review-dropdown-container'>
                                    <ReviewOptionsModal reviewId={review.id} />
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </Modal>
        </div>
    );
}
