import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// thunk import
import { login } from '../../store/session';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const demoLogin = async () => {
    const email = 'demo@aa.io';
    const password = 'password';
    console.log('YOU ARE HERE!!')
    await dispatch(login(email, password));
    return history.push('/');
    ;
  };

  return (
    <nav className='splash-nav-bar'>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Cacophony Logo
          </NavLink>
        </li>
        <li>
          <button onClick={demoLogin}>Demo</button>
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
