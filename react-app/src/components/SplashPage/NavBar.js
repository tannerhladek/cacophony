import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';


const NavBar = () => {
  return (
    <nav className='splash-nav-bar'>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Cacophony Logo
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        {/* <li>
          <LogoutButton />
        </li> */}
        <li>
          {/* TO DO: insert demo button */}
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
