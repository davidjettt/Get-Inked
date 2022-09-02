import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { deleteStudioThunk } from "../../store/studios"
import threedots from '../../Images/three-dots.svg'
import './StudioDetails.css'

export default function StudioDetails() {
    const defaultAvatarImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662073397/dragon-heads-tattoo_xrpoon.jpg'
    const defaultStudioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662048156/TATTOO-MAKING-818x490_e2z4y3.jpg'
    const dispatch = useDispatch()
    const history = useHistory()
    const { studioId }  = useParams()
    const studio = useSelector(state => Object.values(state.studios).find(studio => +studio.id === +studioId))
    // console.log('STUDIO', studio)

    const handleDelete = () => {
        dispatch(deleteStudioThunk(studio))
        history.push('/studios')
    }

    return (
        <div className="studio-details-main">
            <div className="studio-details-header-container">
                <img className="studio-details-header-image" src={studio?.headerImage || defaultStudioImage} alt='header image' />
            </div>
            <div className="studio-details-container">
                <div className="studio-details-info-main">
                    <div className="studio-details-info-container">
                        <div className="three-dots">
                            <img src={threedots} />
                        </div>
                        <div className="studio-details-avatar-name-location">
                            <div className="studio-details-avatar-container">
                                <img className="studio-details-avatar" src={studio?.avatar || defaultAvatarImage} alt='studio-avatar' />
                            </div>
                            <div className="studio-details-name-location-container">
                                <div className="studio-details-name">
                                    {studio?.name}
                                </div>
                                <div className="studio-details-location-container">
                                    <span className="studio-details-location">{studio?.city}, {studio?.state}</span>
                                </div>
                            </div>
                        </div>
                        <div className="studio-details-header-reviews">
                            <div className="studio-details-header-reviews-left">
                                <div></div>
                                {studio?.reviews.length > 0 && <div>
                                    See all reviews {studio?.reviews.length}
                                </div>}
                            </div>
                            <div className="studio-details-header-reviews-right">
                                <div className="studio-details-header-booking-button-container">
                                    <button>Book</button>
                                    <div>
                                        Bookmark
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="studio-details-nav-bar">
                    <div>
                        <button>Studio</button>
                    </div>
                    <div>
                        <button>Portfolio</button>
                    </div>
                    <div>
                        <button>Artists</button>
                    </div>
                </div>
                <div className="studio-details-line"></div>
                <div className="studio-details-content-container">
                    <div className="about-the-studio-container">
                        <div className="about-the-studio">
                            <div>
                                <h2>About the Studio</h2>
                            </div>
                            <div className="studio-description">
                                {studio?.description}
                            </div>
                        </div>
                        <div className="map">
                        </div>
                    </div>
                </div>
                <Link to={`/studios/${studioId}/edit`}>
                    <button>Update Studio</button>
                </Link>
                <button onClick={handleDelete}>Delete Studio</button>
            </div>
        </div>
    )
}
