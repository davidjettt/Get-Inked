import { useState } from "react"
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import Footer from "../Footer/Footer"
import dragon from '../../Images/dragon-yin-yang-image.svg'
import './SplashPage.css'

export default function SplashPage() {
    const [ showSignUp, setShowSignUp ] = useState(false)
    const mainHomePageImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662018933/Stefanie_6-e1619631407239_e0wz9n_653ea0-landscape.jpg'


    const handleShowSignUp = () => {
        setShowSignUp(true)
    }

    return (
        <>
            <div className="splash-page-main">
                <div className="splash-page-main-container">
                    <div className="splash-page-image-container">
                        <img className="splash-page-image" src={mainHomePageImage} alt='traditional-japanese-tatoos-girl' />
                    </div>
                    <div className="splash-page-login-form-container">
                        <div className='login-header-container'>
                            <img className="splash-logo-image" src={dragon} alt='splash-logo' />
                            <div className="splash-logo-text">GET INKED</div>
                        </div>
                        <div className="about-app-container">
                            Get Inked is a web app where authenticated users can create or join a tattoo studio and can post images of their work to draw in more clients. Users will be able to view the portfolio of a studio or artist and schedule an appointment for their next art piece on their body.
                        </div>
                        {!showSignUp && <LoginForm />}
                        <div>
                            {!showSignUp &&
                            <div className="change-to-signup-container">
                                Don't have an account?
                                <button className="change-to-signup-button" onClick={handleShowSignUp}> Sign up</button>
                            </div>}
                            {showSignUp && <SignUpForm setShowSignUp={setShowSignUp} />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
