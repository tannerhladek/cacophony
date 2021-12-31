import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

// style import
import './UserAuth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form-page-container'>
      <div className='login-form-container'>
        <div className='auth-title-container'>
          <div className='auth-form-title'>Welcome Back!</div>
          <div>We're so excited to see you again!</div>
        </div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='auth-form-box'>
            <div className='auth-form-label'>EMAIL</div>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='auth-form-box'>
            <div className='auth-form-label'>PASSWORD</div>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type='submit' className='signup-login-btn'>Login</button>
          </div>
        </form>
        <div className='signup-login-redirect'>
          <NavLink to='/signup' exact={true} activeClassName='active'>
            Need an account?
          </NavLink>
          <NavLink to='/' exact={true} activeClassName='active'>
            Cancel
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
