import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../context/Modal'
import SingleTattoo from './SIngleTattoo'
import heartIcon from '../../Images/heart-icon.svg'
import './Tattoos.css'
import '../../context/Modal.css'
import { useEffect } from 'react'
import { bookmarkTattooThunk } from '../../store/session'

export default function SingleTattooModal({ tattooId, studioPortfolio, small, medium }) {
    // const cardClasses = [ 'small', 'medium', 'large' ]
    // const randomClass = cardClasses[Math.floor(Math.random() * cardClasses.length)]
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [ showModal, setShowModal ] = useState(false)
    const [ bookmarked, setBookmarked ] = useState(false)
    const tattoo = useSelector(state => Object.values(state.tattoos).find(tattoo => +tattoo.id === +tattooId))

    useEffect(() => {
        const userBookmarkIds = sessionUser.tattooBookmarks.map(bookmark => bookmark.id)
        const didUserBookmark = userBookmarkIds.includes(tattooId)
        setBookmarked(didUserBookmark)
    }, [sessionUser])

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleHeartIcon = async (e) => {
        e.stopPropagation()
        await dispatch(bookmarkTattooThunk(tattooId))
    }

    return (
        <>
            <div className={studioPortfolio ? 'studio-portfolio-image-container' : `tattoo-card ${small || medium}`} onClick={handleShowModal}>
                <img className={studioPortfolio ? 'studio-portfolio-image' : 'tattoo-image'} src={tattoo.imageUrl} alt='tattoo' />
                <div className={bookmarked ? 'heart-icon-background tattoo-bookmark' : 'heart-icon-background tattoo-unbookmark'}>
                    <img className='heart-icon-tattoo' src={heartIcon} onClick={handleHeartIcon} alt='heart-icon' />
                </div>
                <div className='bottom-overlay'>
                    <div className='tattoo-card-profile-image'>
                        <img className='single-post-profile-image' src={tattoo.ownerAvatar || 'https://nitreo.com/img/igDefaultProfilePic.png'} alt='' />
                    </div>
                    <div>
                        <div className='tattoo-card-owner'>{tattoo.owner}</div>
                        <div className='tattoo-card-location'>{tattoo.studio.name}</div>
                    </div>
                </div>
            </div>
            {showModal && <Modal closeTimeoutMS={500} onClose={() => setShowModal(false)}>
                <SingleTattoo studioPortfolio={studioPortfolio} tattooId={tattooId} />
            </Modal>}
        </>
    )
}
