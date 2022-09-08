import StudioForm from "./StudioForm";
import './StudioFormPage.css'


export default function StudioFormPage({ studio, formType }) {
    const studioImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662062264/20190405_av9GsLc9CqNfUPO_uuv912.jpg'

    return (
        // <div className="studio-form-page">
            <div className="studio-form-page-main-container">
                <StudioForm studio={studio} formType={formType} />
                <div className="studio-form-page-image-container">
                    <img className="studio-image" src={studioImage} alt='studio' />
                </div>
            </div>
        // </div>
    )
}
