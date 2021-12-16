import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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
    <div className='login-form-page-container'>
      <div className='login-form-container'>
        <div>Welcome Back</div>
        <div>We're so excited to see you again :)</div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <div>EMAIL</div>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <div>PASSWORD</div>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
        <div>
          <span>Need an account?</span>
          <span>
            <NavLink to='/signup' exact={true} activeClassName='active'>Register</NavLink>
          </span>
        </div>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Cancel
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
