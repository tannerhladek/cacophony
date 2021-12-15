import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import LoginForm from './components/auth/LoginForm';
import SplashPage from './components/SplashPage/SplashPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LogoutButton from './components/auth/LogoutButton';


const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  };

  if (sessionUser?.id) {
    return (
      <BrowserRouter>
        <LogoutButton />
        <Switch>
          {/* TO DO: insert logged in home page component */}
        </Switch>
      </BrowserRouter>
    )

  } else {
    history.push('/');

    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true}>
            <SplashPage />
          </Route>
          <Route path='/signup' exact={true}>
            <SignUpForm />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
        </Switch>
      </BrowserRouter>
    )

  };
}

export default App;
