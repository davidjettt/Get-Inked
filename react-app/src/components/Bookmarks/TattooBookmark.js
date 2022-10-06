import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ImageListItem } from '@mui/material'
import { Modal } from '../../context/Modal'
import heartIcon from '../../Images/heart-icon.svg'
import { bookmarkTattooThunk } from "../../store/session"
import SingleTattoo from "../Tattoos/SIngleTattoo"


export default function TattooBookmark({ item }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [ showModal, setShowModal ] = useState(false)
    const [ bookmarked, setBookmarked ] = useState(false)


    useEffect(() => {
        const userBookmarkIds = sessionUser.tattooBookmarks.map(bookmark => bookmark.id)
        const didUserBookmark = userBookmarkIds.includes(item.id)
        setBookmarked(didUserBookmark)
    }, [sessionUser])

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleHeartIcon = async (e) => {
        e.stopPropagation()
        await dispatch(bookmarkTattooThunk(item.id))
    }


    return (
        <>
            <ImageListItem onClick={handleShowModal} key={item.imageUrl}>
                <img
                    style={{borderRadius: 17}}
                    src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.owner}
                    loading="lazy"
                />
                <div className={bookmarked ? 'heart-icon-background tattoo-bookmark' : 'heart-icon-background tattoo-unbookmark'}>
                    <img className='heart-icon-tattoo' src={heartIcon} onClick={handleHeartIcon} alt='heart-icon' />
                </div>
                <div className='bottom-overlay-profile'>
                    <div className='tattoo-card-profile-image'>
                        <img className='single-post-profile-image' src={sessionUser.avatar || 'https://nitreo.com/img/igDefaultProfilePic.png'} alt='' />
                    </div>
                    <div>
                        <div className='tattoo-card-owner'>{sessionUser.name}</div>
                        <div className='tattoo-card-location'>{item.studio.name}</div>
                    </div>
                </div>
            </ImageListItem>
            {showModal && <Modal closeTimeoutMS={500} onClose={() => setShowModal(false)}>
                <SingleTattoo tattooId={item.id} />
            </Modal>}
        </>
    )
}
