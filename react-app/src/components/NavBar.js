
import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import threeLines from '../Images/three-lines.svg'
import dragon from '../Images/dragon-yin-yang-image.svg'
import { useSelector } from 'react-redux';


const NavBar = () => {
  const [ showDropdown, setShowDropdown ] = useState(false)
  const sessionUserId = useSelector(state => state.session.user.id)
  const handleDropdown = () => {
    if (showDropdown) return
    setShowDropdown(true)
}

useEffect(() => {
    if (!showDropdown) return

    const closeDropdown = () => {
        setShowDropdown(false)
    }
    document.addEventListener("click", closeDropdown);

    return () => document.removeEventListener("click", closeDropdown);
}, [showDropdown])


  return (
    <div className='nav-bar-container-main'>
      <div className='nav-bar-container-sub'>
        <div className='nav-buttons-left'>
          <div className='home-button-container'>
            <NavLink to='/home' exact={true}>
              <div className='nav-header-container'>
                <img className="nav-logo-image" src={dragon} alt='nav-logo' />
                <div className="nav-logo-text">GET INKED</div>
              </div>
            </NavLink>
          </div>
          {/* <div className='login-link-container'>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          <div className='signup-link-container'>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div> */}
          {/* <div>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div> */}
          <div className='studios-link-container'>
            <NavLink className='nav-studios-link' to='/studios' exact={true} activeClassName='active'>
              Studios
            </NavLink>
          </div>
          <div className='tattoos-link-container'>
            <NavLink className='nav-tattoos-link' to='/tattoos' exact={true} activeClassName='active'>
              Tattoos
            </NavLink>
          </div>
        </div>
        <div className='nav-buttons-right'>
          <div className='new-studio-link-container'>
            <NavLink className='new-studio-link' to='/studios/new' exact={true}>
              Create a studio
            </NavLink>
          </div>
          <div className='nav-three-lines-container'>
            <img onClick={handleDropdown} className='three-lines' src={threeLines}  alt='three-lines'/>
            {showDropdown &&
            <div className='nav-dropdown-container'>
              <div className='your-profile-container'>Your Profile</div>
              <div className='your-profile-settings-container'>Profile Settings</div>
              <div className='appointments-container'>
                <Link to={`/users/${sessionUserId}/appointments`}>Appointments</Link>
              </div>
              <div className='bookmarks-container'>Your Bookmarks</div>
              <LogoutButton />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
