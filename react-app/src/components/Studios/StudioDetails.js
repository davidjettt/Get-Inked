import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { deleteStudioThunk } from "../../store/studios"


export default function StudioDetails() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { studioId }  = useParams()
    const studio = useSelector(state => Object.values(state.studios).filter(studio => +studio.id === +studioId))
    // console.log('STUDIO', studio)

    const handleDelete = () => {
        dispatch(deleteStudioThunk(studio[0]))
        history.push('/studios')
    }

    return (
        <>
            <Link to={`/studios/${studioId}/edit`}>
                <button>Update Studio</button>
            </Link>
            <button onClick={handleDelete}>Delete Studio</button>
            <h1>this is studio {studioId}</h1>
            {studio[0]?.headerImage && <img src={studio[0]?.headerImage} alt='header image' />}
            {studio[0].avatar && <img src={studio[0].avatar} alt='studio-avatar' />}
        </>
    )
}
