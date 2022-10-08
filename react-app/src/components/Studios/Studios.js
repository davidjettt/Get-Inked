import { useSelector } from 'react-redux'
import StudioCard from './StudioCard'
import './Studios.css'

export default function Studios() {
    const studios = useSelector(state => Object.values(state.studios))
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
                        <StudioCard studioId={studio.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
