import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Studios.css'
import goldStar from '../../Images/gold-star.svg'
import prevArrow from '../../Images/prev-arrow.svg'
import nextArrow from '../../Images/next-arrow.svg'


export default function StudioCard ({ studioId }) {
    const defaultStudioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662048156/TATTOO-MAKING-818x490_e2z4y3.jpg'
    const defaultAvatarImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662073397/dragon-heads-tattoo_xrpoon.jpg'
    const studio = useSelector(state => state.studios[+studioId])
    const [ index, setIndex ] = useState(0)

    const handleNext = (e) => {
        e.preventDefault()
        if (studio.studioImages[index + 1]) {
            setIndex((prev) => prev + 1)
        } else {
            return
        }
    }

    const handlePrev = (e) => {
        e.preventDefault()
        if (index === 0) {
            return
        }
        setIndex((prev) => prev - 1)
    }

    return (
        <>
            <Link className='studio-link' to={`/studios/${studio.id}`}>
                <div key={studio.id} className='studio-card-container'>
                    <div className='studio-card-image-container'>
                        {studio.studioImages?.length > 0 && <img className='studio-preview-image' src={ studio.studioImages[index] } alt='studio-preview' />}
                        {studio.studioImages?.length === 0 && <img className='studio-preview-image' src={ defaultStudioImage } alt='studio-preview' />}
                        {studio.studioImages?.length > 1 && <img src={nextArrow} onClick={handleNext} className='next-btn' alt='next arrow' />}
                        {studio.studioImages?.length > 1 && <img src={prevArrow} onClick={handlePrev} className='prev-btn' alt='prev arrow' />}
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
        </>
    )
}
