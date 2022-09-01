import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StudioFormPage from "./StudioFormPage";



export default function UpdateStudioForm() {
    const { studioId } = useParams()
    const studio = useSelector(state => state.studios[studioId])


    return (
        <StudioFormPage studio={studio} formType='Update Studio' />
    )
}
