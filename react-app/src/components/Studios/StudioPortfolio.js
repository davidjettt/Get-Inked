import { useState } from "react"
import { useSelector } from "react-redux"
import SingleTattooModal from "../Tattoos/SingleTattooModal"
import { Modal } from "../../context/Modal"
import SingleTattoo from "../Tattoos/SingleTattoo"

export default function StudioPortfolio({ studioId }) {
    const [ showModal, setShowModal ] = useState(false)
    const tattoos = useSelector(state => Object.values(state.tattoos)
                    .filter(tattoo => +studioId === +tattoo.studioId))

    const handleShowModal = () => {
        setShowModal(true)
    }

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
