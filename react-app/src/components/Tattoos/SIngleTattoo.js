import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TattooOptionsModal from "./TattooOptionsModal";


export default function SingleTattoo({ tattooId, studioPortfolio }) {
    const [ overflow, setOverflow ] = useState(false)
    const defaultUserProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const tattoo = useSelector(state => Object.values(state.tattoos).find(tattoo => +tattoo.id === +tattooId))
    const sessionUserId = useSelector(state => state.session.user.id)

    // let className
    // const tattooStyle = tattoo?.tattooStyle
    // if (tattooStyle?.indexOf(' ') === -1) {
    //     className = 'word-break'
    // } else {
    //     className = 'tattoo-style-container'
    // }


    useEffect(() => {
        if (!overflow) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        }
        return () => {
            document.body.style.overflow = 'visible'
            document.body.style.paddingRight = '0px';
        }
    }, [overflow]);


    return (
        <div className="tattoo-modal-container">
            <div className="tattoo-modal-image-container">
                <img className="tattoo-modal-image" src={tattoo.imageUrl} alt='' />
            </div>
            <div className="tattoo-modal-left-container">
                <div className="tattoo-modal-user-avatar-container">
                    <div className="tattoo-modal-avatar-container">
                        <div className="tattoo-modal-owner-info">
                            <img className="single-post-profile-image" src={defaultUserProfilePic} alt='' />
                            <span className="tattoo-owner-name-text">{tattoo.owner}</span>
                        </div>
                        <div className="tattoo-modal-threedots-container">
                            {+sessionUserId === +tattoo.userId && <TattooOptionsModal tattooId={tattooId} />}
                        </div>
                    </div>
                </div>
                <div className="tattoo-style-container">
                    Style: {tattoo.tattooStyle}
                </div>
                <div className="tattoo-modal-description-container">
                    {tattoo.description}
                </div>
                {!studioPortfolio && <div className="tattoo-modal-studio-container-main">
                    <span className="done-at-text">Done at</span>
                    <Link className="tattoo-modal-studio-container" to={`/studios/${tattoo.studioId}`}>
                        <div className="tattoo-modal-studio-avatar-location">
                            <img className="single-post-profile-image" src={tattoo.studio.avatar || defaultUserProfilePic} alt='' />
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
                </div>}
            </div>
        </div>
    )
}
