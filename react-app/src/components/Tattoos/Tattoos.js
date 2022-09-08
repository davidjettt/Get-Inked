import {  useSelector } from "react-redux";
import SingleTattooModal from "./SingleTattooModal";
import './Tattoos.css'

export default function Tattoos() {
    const tattoosHeaderImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662605953/Tattoo-master-puts-tattoo-in-form-of-flower-on-arm-1296x728-header_qkrn6j.jpg'



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
                    {/* {tattoos.map((tattoo, idx) => (
                        <SingleTattooModal key={tattoo.id} tattooId={tattoo.id} />
                    ))} */}
                    {tattoos.map((tattoo, idx) => {
                        if (idx % 2 === 0) {
                            return <SingleTattooModal key={tattoo.id} tattooId={tattoo.id} small='small' />
                        } else {
                            return <SingleTattooModal key={tattoo.id} tattooId={tattoo.id} medium='medium' />
                        }
                    }
                    )}
                </div>
            </div>
        </div>
    )
}
