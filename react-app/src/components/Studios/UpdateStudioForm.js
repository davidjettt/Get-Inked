import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StudioForm from "./StudioForm";



export default function UpdateStudioForm() {
    const { studioId } = useParams()
    const studio = useSelector(state => state.studios[studioId])


    return (
        <StudioForm studio={studio} formType='Update Studio' />
    )
}
