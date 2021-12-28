import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

// thunk import
import { removeServersThunk } from '../../store/servers';
import { removeMessagesThunk } from '../../store/messages';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(removeServersThunk());
    await dispatch(removeMessagesThunk());
    return history.push('/')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
