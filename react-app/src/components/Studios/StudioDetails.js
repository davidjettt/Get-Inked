import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import threedots from '../../Images/three-dots.svg'
import './StudioDetails.css'
import StudioPortfolio from "./StudioPortfolio"
import TattooFormModal from "../Tattoos/TattooFormModal"
import { Modal } from "../../context/Modal"
import { Rating } from 'react-simple-star-rating'
import DeleteButton from "../DeleteButton/DeleteButton"
// import Footer from "../Footer/Footer"
import Reviews from "../Reviews/Reviews"
// import Map from "../Map/Map"
import ReviewsModal from "../ReviewsModal/ReviewsModal"


export default function StudioDetails() {
    const [ showDropdown, setShowDropdown ] = useState(false)
    const [ showModal, setShowModal ] = useState(false)
    const [ menuClassName, setMenuClassName ] = useState(false)
    const defaultAvatarImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662073397/dragon-heads-tattoo_xrpoon.jpg'
    const defaultStudioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662048156/TATTOO-MAKING-818x490_e2z4y3.jpg'
    const history = useHistory()
    const { studioId }  = useParams()
    const studio = useSelector(state => Object.values(state.studios).find(studio => +studio.id === +studioId))
    const studioOwnerId = studio?.ownerId
    const sessionUserId = useSelector(state => state.session.user.id)
    let starCount = 0
    let avgRating

    useEffect(() => {
        if (!studio) {
            history.push('/studios')
        }
    }, [studio])


    if (studio) {
        if (studio.reviews?.length > 0) {
            studio.reviews.forEach((review) => {
                starCount += review.stars
            })
            avgRating = (starCount / studio.reviews.length).toFixed(1)
        }
    }

    const handleDropdown = () => {
        if (showDropdown) return
        setShowDropdown(true)
        setMenuClassName(true)
    }

    useEffect(() => {
        if (!showDropdown) return

        const closeDropdown = () => {
            setShowDropdown(false)
            setMenuClassName(false)
        }
        document.addEventListener("click", closeDropdown);

        return () => document.removeEventListener("click", closeDropdown);
    }, [showDropdown])

    return (
        <>
            {studio && <div className="studio-details-main">
                <div className="studio-details-header-container">
                    <img className="studio-details-header-image" src={studio?.headerImage || defaultStudioImage} alt='header' />
                </div>
                <div className="studio-details-container">
                    <div className="studio-details-info-main">
                        <div className="studio-details-info-container">
                            {sessionUserId === studioOwnerId && <div className="three-dots">
                                <img onClick={handleDropdown} src={threedots} alt='three-dots' />
                                <div className={menuClassName ? "dropdown-container" : 'dropdown-off'}>
                                    {showDropdown && <Link className="update-studio-button" to={`/studios/${studioId}/edit`}>
                                        Update Studio
                                    </Link>}
                                    {showDropdown && <button className="delete-studio-button" onClick={() => setShowModal(true)}>Delete Studio</button>}
                                    {showModal && <Modal onClose={() => setShowModal(false)}>
                                        <DeleteButton studio={{...studio}} setShowModal={setShowModal} />
                                    </Modal>}
                                </div>
                            </div>}
                            <div className="studio-details-avatar-name-location">
                                <div className="studio-details-avatar-container">
                                    <img className="studio-details-avatar" src={studio?.avatar || defaultAvatarImage} alt='studio-avatar' />
                                </div>
                                <div className="studio-details-name-location-container">
                                    <div className="studio-details-name">
                                        {studio?.name}
                                    </div>
                                    <div className="studio-details-location-container">
                                        <div className='studio-details-location' >{ studio?.address }</div>
                                        <span className="studio-details-location">{studio?.city}, {studio?.state} {studio?.zipCode}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="studio-details-header-reviews">
                                {studio.reviews.length > 0 ? <div className="studio-details-header-reviews-left">
                                    <Rating
                                        size={20}
                                        allowHalfIcon={true}
                                        ratingValue={avgRating * 20}
                                        // onClick={newRating}
                                        fillColor='#1F2125'
                                        readonly={true}
                                        // transition={true}
                                    />
                                    <div className="avg-rating" >
                                        {avgRating}
                                    </div>
                                    <div className="see-all-reviews">
                                        {/* See all reviews ({studio?.reviews.length}) */}
                                        <ReviewsModal studioId={studioId} />
                                    </div>
                                </div> : <div>No reviews yet</div>}
                                <div className="studio-details-header-reviews-right">
                                    <div className="studio-details-header-booking-button-container">
                                        <Link className="booking-button" to={`/studios/${studioId}/appointment`}>
                                            Book
                                        </Link>
                                        <div>
                                            {/* Bookmark */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="studio-details-nav-bar">
                        <div>
                            {/* <button>Studio</button> */}
                        </div>
                        <div>
                            {/* <button>Portfolio</button> */}
                        </div>
                        <div>
                            {/* <button>Artists</button> */}
                        </div>
                    </div>
                    <div className="studio-details-line"></div>
                    <div className="studio-details-content-container">
                        <div className="about-the-studio-container">
                            <div className="about-the-studio">
                                <div>
                                    <h2>About the Studio</h2>
                                </div>
                                <div className='studio-description'>
                                    {studio?.description}
                                </div>
                            </div>
                            {/* <Map /> */}
                        </div>
                        <div className="studio-portfolio-container">
                            <div className="studio-portfolio-header-container">
                                <h2>Portfolio</h2>
                                {sessionUserId === studioOwnerId &&  <TattooFormModal studioId={studioId} />}
                            </div>
                            {studio && <StudioPortfolio studioId={studio.id} />}
                        </div>
                        <Reviews studioId={studioId} />
                    </div>
                </div>
            </div>}
            {/* <Footer /> */}
        </>
    )
}
