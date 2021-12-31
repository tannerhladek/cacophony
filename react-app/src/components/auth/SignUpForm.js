import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

// component imports
import SplashImage from '../SplashPage/assets/Chat_12.png';


// style import
import './UserAuth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_image_url, setProfile_image_url] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, profile_image_url, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfileImageUrl = (e) => {
    setProfile_image_url(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (sessionUser?.id) {
    return <Redirect to='/' />;
  } else {

    return (
      <div className='signup-form-page-container'>
        {/* <img className='signup-splash-img' src={SplashImage} alt='splash' /> */}
        <div className='signup-form-container'>
          <div className='auth-form-title'>Create an account</div>
          <form onSubmit={onSignUp}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='auth-form-box'>
              <div className='auth-form-label'>USERNAME</div>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='auth-form-box'>
              <div className='auth-form-label'>EMAIL</div>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='auth-form-box'>
              <div className='auth-form-label'>PROFILE IMAGE URL</div>
              <input
                type='text'
                name='profile_image_url'
                onChange={updateProfileImageUrl}
                value={profile_image_url}
              ></input>
            </div>
            <div className='auth-form-box'>
              <div className='auth-form-label'>PASSWORD</div>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='auth-form-box'>
              <div className='auth-form-label'>REPEAT PASSWORD</div>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type='submit' className='signup-btn'>Sign Up</button>
          </form>
          <div className='signup-redirect'>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Already have an account?
            </NavLink>
            <NavLink to='/' exact={true} activeClassName='active'>
              Cancel
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
};

export default SignUpForm;
