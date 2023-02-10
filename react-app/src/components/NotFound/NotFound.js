import { Link } from "react-router-dom";
import notFoundImage from '../../Images/404-image.webp'
import './NotFound.css'

export default function NotFound() {
    return (
        <>
            <div className="not-found-main">
                <div className="not-found-message-container">
                    <div className="message-404">
                        404
                    </div>
                    <div className="message">
                        Sorry! Your requested page could not be found.
                    </div>
                    <div className="back-to-home">
                        <Link to='/home'>
                            Back to home
                        </Link>
                    </div>
                </div>
                <div className="not-found-image-container">
                    <img className="not-found-image" src={notFoundImage} alt='not-found' />
                </div>
            </div>
        </>
    )
}
