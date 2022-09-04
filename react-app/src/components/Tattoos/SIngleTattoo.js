import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function SingleTattoo({ tattooId }) {
    const defaultUserProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const tattoo = useSelector(state => Object.values(state.tattoos).find(tattoo => +tattoo.id === +tattooId))


    return (
        <div className="tattoo-modal-container">
            <div className="tattoo-modal-image-container">
                <img className="tattoo-modal-image" src={tattoo.imageUrl} alt='' />
            </div>
            <div className="tattoo-modal-left-container">
                <div className="tattoo-modal-user-avatar-container">
                    <div className="tattoo-modal-avatar-container">
                        <img className="single-post-profile-image" src={defaultUserProfilePic} alt='' />
                        <span>{tattoo.owner}</span>
                    </div>
                </div>
                <div className="tattoo-modal-description-container">
                    {tattoo.description}
                </div>
                <div className="tattoo-modal-studio-container-main">
                    <span>Done at</span>
                    <Link className="tattoo-modal-studio-container" to={`/studios/${tattoo.studioId}`}>
                        <div className="tattoo-modal-studio-avatar-location">
                            <img className="single-post-profile-image" src={defaultUserProfilePic} alt='' />
                        </div>
                        <div className="tattoo-modal-studio-name-location">
                            <div className="tattoo-modal-studio-name">
                                {tattoo.studio.name}
                            </div>
                            <div className="tattoo-modal-studio-location">
                                <span>{tattoo.studio.city}, {tattoo.studio.state}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
