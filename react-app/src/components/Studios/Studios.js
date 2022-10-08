import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import goldStar from '../../Images/gold-star.svg'
import './Studios.css'

export default function Studios() {
    const studios = useSelector(state => Object.values(state.studios))
    const defaultStudioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662048156/TATTOO-MAKING-818x490_e2z4y3.jpg'
    const defaultAvatarImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662073397/dragon-heads-tattoo_xrpoon.jpg'
    const studiosHeaderImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662056527/Skin-Desing-Tattoo-Cover-Up-1536x768_pj155x.jpg'

    // const tattoos = useSelector(state => Object.values(state.tattoos).find())

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
                                    {studio.studioImages?.length > 0 && <img className='studio-preview-image' src={ studio.studioImages[0] } alt='studio-preview' />}
                                    {studio.studioImages?.length === 0 && <img className='studio-preview-image' src={ defaultStudioImage } alt='studio-preview' />}
                                </div>
                                <div className='studio-info-container'>
                                    <div className='studio-avatar'>
                                        <img className='studio-details-avatar' src={studio.avatar || defaultAvatarImage} alt='avatar' />
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
                                <div className='studio-card-bottom-container'>
                                    <div className='studio-card-reviews-container'>
                                        <img src={goldStar} alt='gold star' />
                                        <span> { studio.reviews.length > 0 ? (studio.reviews.reduce((acc, review) => {
                                            return acc + review.stars
                                        }, 0) / studio.reviews.length).toFixed(1) : 'No reviews yet'}</span>
                                    </div>
                                    <div className='booking-button-container'>
                                        <Link to={`/studios/${studio.id}/appointment`} className='studios-booking-button'>Book</Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
