import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import tattoo1 from '../../Images/collage/collage-tattoo-1.jpg'
import tattoo2 from '../../Images/collage/collage-tattoo-2.jpeg'
import tattoo3 from '../../Images/collage/collage-tattoo-3.jpeg'
import tattoo4 from '../../Images/collage/collage-tattoo-4.jpeg'
import tattoo5 from '../../Images/collage/collage-tattoo-5.jpeg'
import tattoo6 from '../../Images/collage/collage-tattoo-6.jpeg'
import './HomePage.css'

export default function HomePage() {
    const mainHomePageImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662587273/332474_uh4kq5.jpg'
    const studioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662107273/737e3063f926dc54367f44b51e7fdc29_p1ynfi.jpg'

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
                    <div className='app-message'>
                        Because getting a tattoo is a big deal. We will help you find the right artist for you tattoo and make the process as painless as possible.
                    </div>
                </div>
                <img className="home-page-main-image" src={mainHomePageImage} alt='traditional-japanese-tattoos-girl' />
            </div>
            <div className='home-page-below-image-container'>
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
                            <img className='tat1' src={tattoo1} alt='' />
                            <img className='tat2' src={tattoo2} alt='' />
                            <img className='tat3' src={tattoo3} alt='' />
                            <img className='tat4' src={tattoo6} alt='' />
                            <img className='tat5' src={tattoo5} alt='' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
