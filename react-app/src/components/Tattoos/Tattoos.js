import { useSelector } from "react-redux";
import SingleTattooModal from "./SingleTattooModal";
import './Tattoos.css'

export default function Tattoos() {
    const studiosHeaderImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662056527/Skin-Desing-Tattoo-Cover-Up-1536x768_pj155x.jpg'
    const tattoos = useSelector(state => Object.values(state.tattoos))


    return (
        <div className="tattoos-page-main">
            <div className="tattoos-page-secondary">
                <div className='studios-page-header-container'>
                    <div className='header-text-container'>
                        <h3 className='header-text'>Find your inspiration</h3>
                    </div>
                    <img className='studio-page-header-image' src={studiosHeaderImage} alt='studios-header'/>
                </div>
                <div className="tattoo-cards-container-main">
                    {tattoos.map((tattoo) => (
                        <div key={tattoo.id}>
                            <SingleTattooModal tattooId={tattoo.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
