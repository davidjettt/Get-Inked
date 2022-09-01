
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {


  return (
    <div className='nav-bar-container-main'>
      <div className='nav-bar-container-sub'>
        <div className='home-button-container'>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div className='login-link-container'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div className='signup-link-container'>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        <div className='studios-link-container'>
          <NavLink to='/studios' exact={true} activeClassName='active'>
            Studios
          </NavLink>
        </div>
        <div className='new-studio-link-container'>
          <NavLink to='/studios/new' exact={true} activeClassName='active'>
            Create a studio
          </NavLink>
        </div>
        <div className='logout-button-container'>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
