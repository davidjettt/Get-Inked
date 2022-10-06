
import { useSelector } from "react-redux"
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import '../Tattoos/Tattoos.css'
import './Bookmarks.css'
import TattooBookmark from './TattooBookmark';


export default function TattooBookmarks() {
    const sessionUserTattooBookmarks = useSelector(state => state.session.user.tattooBookmarks)

    return (
        <>
            <div className="tattoo-bookmarks-main">
                <Box sx={{ width: '100%', height: 'auto', overflowY: 'hidden' }}>
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {sessionUserTattooBookmarks.map((item) => (
                                <TattooBookmark item={item} />
                            ))}
                    </ImageList>
                </Box>
            </div>
        </>
    )
}
