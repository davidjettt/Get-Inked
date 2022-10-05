import { useSelector } from "react-redux"

import './Profile.css'


export default function Profile() {
    const defaultProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const sessionUser = useSelector(state => state.session.user)



    return (
        <>
            <div className="profile-main">
                <div className="profile-container-left">
                    <div className="edit-profile-button">
                        <button>Edit Profile</button>
                    </div>
                    <div className="user-info">
                        <div className="profile-pic-container">
                            <img className="profile-pic" src={sessionUser.avatar || defaultProfilePic}  alt='avatar' />
                        </div>
                    </div>
                </div>
                <div className="profile-container-right">

                </div>
            </div>
        </>
    )
}
