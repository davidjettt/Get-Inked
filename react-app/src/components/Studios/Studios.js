import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Studios.css'

export default function Studios() {
    const studios = useSelector(state => Object.values(state.studios))
    const defaultStudioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662048156/TATTOO-MAKING-818x490_e2z4y3.jpg'
    const defaultAvatarImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662073397/dragon-heads-tattoo_xrpoon.jpg'
    const studiosHeaderImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662056527/Skin-Desing-Tattoo-Cover-Up-1536x768_pj155x.jpg'
    return (
        <div className='studios-page-main'>
            <div className='studios-page-container'>
                <div className='studios-page-header-container'>
                    <div className='header-text-container'>
                        <h3 className='header-text'>Find your studio</h3>
                    </div>
                    <img className='studio-page-header-image' src={studiosHeaderImage} alt='studios-header'/>
                </div>
                <div className='studios-cards-container-main'>
                    {studios.map((studio) => (
                        <Link className='studio-link' key={studio.id} to={`/studios/${studio.id}`}>
                            <div key={studio.id} className='studio-card-container'>
                                <div className='studio-card-image-container'>
                                    <img className='studio-preview-image' src={studio.studioImages[0] || defaultStudioImage } alt='studio-preview' />
                                </div>
                                <div className='studio-info-container'>
                                    <div className='studio-avatar'>
                                        <img className='studio-details-avatar' src={studio.avatar || defaultAvatarImage} />
                                    </div>
                                    <div className='studio-name-location-container'>
                                        <div className='studio-name'>
                                            {studio.name}
                                        </div>
                                        <div className='studio-location'>
                                            <span>{studio.city}, </span>
                                            <span>{studio.state}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='studio-reviews-container'>
                                    <span>star </span>
                                    <span>average rating</span>
                                    {/* <div className='booking-button-container'>
                                        <button className='book-button-studios-page'>Book</button>
                                    </div> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
