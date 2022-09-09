import github from '../../Images/github-icon.svg'
import linkedin from '../../Images/linkedin-icon.svg'
import dragon from '../../Images/dragon-yin-yang-image.svg'
import './Footer.css'

export default function Footer() {

    return (
        <div className='footer-container-main'>
            <div className="footer-container-secondary">
                <div className='footer-logo-container'>
                    <img className='footer-logo-image' src={dragon}  alt='logo-footer'/>
                    GET INKED
                </div>
                <div className='footer-about-container'>
                    <div className='developer-container'>
                        Developed by David Jetsupphasuk
                    </div>
                    <div className='icons-container'>
                        <div className='github-container'>
                            <a target='_blank' rel='noreferrer' href='https://github.com/davidjettt'>
                                <img className='github' src={github} alt='github' />
                            </a>
                        </div>
                        <div className='linkedin-container'>
                        <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/david-jetsupphasuk-1494a6125/'>
                                <img className='linkedin' src={linkedin} alt='linkedin' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
