import { useSelector } from "react-redux"
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import TattooBookmark from "../Bookmarks/TattooBookmark";






export default function UserTattoos() {
    const sessionUser = useSelector(state => state.session.user)

    const sessionUserTattoos = useSelector(state => Object.values(state.tattoos)
                                .filter(tattoo => +tattoo.userId === +sessionUser.id))


    return (
        <>
            <div className="user-tattoos-main">
                <Box sx={{ width: '100%', height: 'auto', overflowY: 'auto' }}>
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {sessionUserTattoos.map((item) => (
                                <TattooBookmark item={item} />
                            ))}
                    </ImageList>
                </Box>
            </div>
        </>
    )
}
