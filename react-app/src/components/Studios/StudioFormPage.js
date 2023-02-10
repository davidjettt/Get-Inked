import StudioForm from "./StudioForm";
import UpdateStudioForm from "./UpdateStudioForm";
import './StudioFormPage.css'

export default function StudioFormPage({ studio, formType }) {
    let form

    if (formType == 'Create Studio') {
        form = <StudioForm studio={studio} />
    } else {
        form = <UpdateStudioForm studio={studio} />
    }

    return (
        <>
            <div className="studio-form-page-main-container">
                {form}
                <div className="studio-form-page-image-container">
                </div>
            </div>
        </>
    )
}
