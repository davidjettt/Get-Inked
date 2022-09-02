import { useSelector } from "react-redux";



export default function SingleTattoo({ tattooId }) {
    const tattoo = useSelector(state => Object.values(state.tattoos).find(tattoo => +tattoo.id === +tattooId))


    return (
        <div>
            <div>
                {tattoo.description}
            </div>
            <div>
                <img src={tattoo.imageUrl} />
            </div>
        </div>
    )
}
