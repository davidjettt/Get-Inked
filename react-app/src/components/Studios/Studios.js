import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Studios.css'

export default function Studios() {
    const studios = useSelector(state => Object.values(state.studios))

    return (
        <>
            {studios.map((studio) => (
                <Link to={`/studios/${studio.id}`}>
                    <div key={studio.id} className='studio-card-container'>
                        <div className='studio-card-image'>
                            <img src={studio.studioImages[0]} />
                        </div>
                        <div className='studio-info-container'>
                            <div className='studio-avatar'>
                                avatar
                            </div>
                            <div className='studio-name'>
                                {studio.name}
                            </div>
                            <div className='studio-location'>
                                <span>{studio.city}</span>
                                <span>{studio.state}</span>
                            </div>
                        </div>
                        <div className='studio-reviews-container'>
                            <span>star </span>
                            <span>average rating</span>
                            <div className='booking-button-container'>
                                <button>Book</button>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    )
}
