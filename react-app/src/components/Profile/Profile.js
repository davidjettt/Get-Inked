import { useSelector } from "react-redux"
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import './Profile.css'
import { useState } from "react"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import UserTattoos from "./UserTattoos"
import TattooBookmarks from "../Bookmarks/TattooBookmarks"
import { useHistory } from "react-router-dom"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
    }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
    }



export default function Profile() {
    const history = useHistory()
    const [ value, setValue ] = useState(0)
    const defaultProfilePic = 'https://nitreo.com/img/igDefaultProfilePic.png'
    const sessionUser = useSelector(state => state.session.user)
    const userStudios = useSelector(state => Object.values(state.studios)
                                    .filter(studio => +studio.ownerId === +sessionUser.id))

    if (!sessionUser) {
        history.push('/')
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            {sessionUser && <div className="profile-main">
                <div className="profile-container-left">
                    <div className='profile-container-left-sub'>
                        <div className="edit-profile-button">
                            {/* <Button variant='outlined' >Edit Profile</Button> */}
                        </div>
                        <div className="user-info-container">
                            <div className="profile-pic-container">
                                <Avatar sx={{width: 56, height: 56}} src={sessionUser.avatar || defaultProfilePic} />
                            </div>
                            <div className='profile-name-container'>
                                <div className='profile-user-name'>
                                    {sessionUser.name}
                                </div>
                                {/* {userStudios.map((studio) => (
                                    <div style={{wordBreak: 'break-word'}} key={studio.id}>
                                        {studio.name}
                                    </div>
                                ))} */}
                            </div>
                        </div>
                        <div className="user-bio-container">
                            <div className="user-bio-text">Bio</div>
                            <div className="user-bio">
                                {/* {sessionUser.bio} */}
                                Coming Soon
                            </div>
                        </div>
                        <div className="user-workplaces-container">
                            <div className="workplaces-text">Workplaces</div>
                            {userStudios.map((studio) => (
                                    <div className="profile-studio-container" key={studio.id}>
                                        <div className="profile-studio-avatar-container">
                                            <Avatar src={studio.avatar || defaultProfilePic} />
                                        </div>
                                        <div className="profile-studio-right-container">
                                            <div className="profile-studio-name">
                                                {studio.name}
                                            </div>
                                            <div className="profile-studio-location">
                                                {studio.city}, {studio.state}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="profile-container-right">
                    <div className="profile-container-right-tab">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs textColor="inherit" TabIndicatorProps={{style: {background: 'black'}}} value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab  label=" Your Tattoos" {...a11yProps(0)} />
                                <Tab label="Bookmarked Tattoos" {...a11yProps(1)} />
                                <Tab label="Bookmarked Studios" {...a11yProps(2)} />
                                <Tab label="Profile Settings" {...a11yProps(3)} />
                            </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <UserTattoos />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <TattooBookmarks />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            Coming Soon!
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                            Coming Soon!
                            </TabPanel>
                    </div>
                </div>
            </div>}
        </>
    )
}
