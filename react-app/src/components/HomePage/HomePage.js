import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import Footer from '../Footer/Footer'
import './HomePage.css'

export default function HomePage() {
    const mainHomePageImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662437719/tattoo-models_r663as.webp'
    const studioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662107273/737e3063f926dc54367f44b51e7fdc29_p1ynfi.jpg'
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div className="home-page-main">
            <div className="home-page-main-image-container">
                <div className="main-image-text-container">
                    <div className="app-name">
                        GET INKED
                    </div>
                    <div className="app-description">
                        FIND THE RIGHT ARTIST FOR YOUR NEXT TATTOO
                    </div>
                </div>
                <img className="home-page-main-image" src={mainHomePageImage} alt='traditional-japanese-tattoos-girl' />
            </div>
            <div className="home-page-artists-container">
                <div className="home-page-artists-secondary">
                    <div className="artists-image-container">
                        <img className='artists-image' src={studioImage} alt='' />
                    </div>
                    <div className="artists-left-container">
                        <div className='artists-heading'>Studios on Get Inked</div>
                        <div className='artists-paragraph'>Take a look at our featured tattoo studios.</div>
                        <Link className='studios-link' to='/studios'>
                            Discover studios
                        </Link>
                    </div>
                </div>
            </div>
            <div className='home-page-tattoos-container'>
                <div className='home-page-tattoos-secondary'>
                    <div className='tattoos-right-container'>
                        <div className='tattoos-heading'>Get inspired for your next tattoo.</div>
                        <div className='tattoos-paragraph'>We've curated a beautiful library of tattoos for you to explore.</div>
                        <Link className='tattoos-link' to='/tattoos'>
                            Explore tattoos
                        </Link>
                    </div>
                    <div className='tattoos-image-container'>
                        <img className='artists-image' src={studioImage} alt='' />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
