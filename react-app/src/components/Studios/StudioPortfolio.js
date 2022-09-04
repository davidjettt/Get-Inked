import { useSelector } from "react-redux"
import SingleTattooModal from "../Tattoos/SingleTattooModal"

export default function StudioPortfolio({ studioId }) {
    const tattoos = useSelector(state => Object.values(state.tattoos)
                    .filter(tattoo => +studioId === +tattoo.studioId))

    return (
        <>
            <div className="studio-portfolio-main">
                {tattoos.map((tattoo) => (
                    // <div className="studio-portfolio-image-container" key={tattoo.id}>
                    //     <img className="studio-portfolio-image" src={tattoo.imageUrl} alt='' />
                    // </div>
                    <SingleTattooModal studioPortfolio={true} key={tattoo.id} tattooId={tattoo.id} />
                ))}
            </div>
        </>
    )
}
