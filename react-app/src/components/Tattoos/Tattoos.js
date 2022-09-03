import { useSelector } from "react-redux";
import SingleTattooModal from "./SingleTattooModal";
import './Tattoos.css'

export default function Tattoos() {
    const tattoosHeaderImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662180533/male-doing-image-on-arm-picture-id669911398_eaopmg.jpg'
    const tattoos = useSelector(state => Object.values(state.tattoos))


    return (
        <div className="tattoos-page-main">
            <div className="tattoos-page-secondary">
                <div className='studios-page-header-container'>
                    <div className='header-text-container'>
                        <h3 className='header-text'>Find your inspiration</h3>
                    </div>
                    <img className='studio-page-header-image' src={tattoosHeaderImage} alt='tattoos-header'/>
                </div>
                <div className="tattoo-cards-container-main">
                    {tattoos.map((tattoo) => (
                        <SingleTattooModal key={tattoo.id} tattooId={tattoo.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
