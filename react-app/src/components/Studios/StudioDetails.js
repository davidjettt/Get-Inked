import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"


export default function StudioDetails() {
    const { studioId }  = useParams()
    const studio = useSelector(state => Object.values(state.studios).filter(studio => +studio.id === +studioId))
    // console.log('STUDIO', studio)

    return (
        <>
            <h1>this is studio {studioId}</h1>
            <img src={studio[0].headerImage} alt='header image' />
            <img src={studio[0].avatar} alt='studio-avatar' />
        </>
    )
}
