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
    const studio = useSelector(state => Object.values(state.studios).filter(studio => +studio.id === +studioId))
    // console.log('STUDIO', studio)

    const handleDelete = () => {
        dispatch(deleteStudioThunk(studio[0]))
        history.push('/studios')
    }

    return (
        <div className="studio-details-main">
            <div className="studio-details-header-container">
                <img className="studio-details-header-image" src={studio[0]?.headerImage || defaultStudioImage} alt='header image' />
            </div>
            <div className="studio-details-container">
                <div className="studio-details-info-main">
                    <div className="studio-details-info-container">
                        <div className="three-dots">
                            <img src={threedots} />
                        </div>
                        <div className="studio-details-avatar-name-location">
                            <div className="studio-details-avatar-container">
                                <img className="studio-details-avatar" src={studio[0]?.avatar || defaultAvatarImage} alt='studio-avatar' />
                            </div>
                            <div className="studio-details-name-location-container">
                                <div className="studio-details-name">
                                    {studio[0]?.name}
                                </div>
                                <div className="studio-details-location-container">
                                    <span className="studio-details-location">{studio[0]?.city}, {studio[0]?.state}</span>
                                </div>
                            </div>
                        </div>
                        <div className="studio-details-header-reviews">
                            <div className="studio-details-header-reviews-left">
                                <div></div>
                                {studio[0]?.reviews.length > 0 && <div>
                                    See all reviews {studio[0]?.reviews.length}
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
                                {studio[0].description}
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
