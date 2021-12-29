import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//component import
import logo from './assets/cacophony-logo.svg'

// thunk import
import { login } from '../../store/session';

const SplashNavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const demoLogin = async () => {
    const email = 'demo@aa.io';
    const password = 'password';
    await dispatch(login(email, password));
    return history.push('/');
    ;
  };

  return (
    <div className='splash-nav-container'>
      <nav className='splash-nav-bar'>
        <ul>
          <div id='splash-nav-left'>
            <li>
              <NavLink to='/' exact={true} activeClassName='active'>
                <img id='splash-logo' src={logo} alt='cacophony-logo'/>
              </NavLink>
            </li>
            <li id='logo-title'>
              Cacophony
            </li>
          </div>
          <div id='splash-nav-right'>
            <li>
              <a onClick={demoLogin} className='splash-nav-btn' id='demo-btn'>Demo</a>
            </li>
            <li>
              <NavLink to='/signup' exact={true} activeClassName='active' className='splash-nav-btn'>
                Sign Up
              </NavLink>
            </li>
            {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
            <li>
              <NavLink to='/login' exact={true} activeClassName='active' className='splash-nav-btn'>
                Login
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </div>

  );
}

export default SplashNavBar;
