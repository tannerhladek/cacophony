import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import LogoutButton from '../auth/LogoutButton'
import ServerListComponent from './ServerListComponent';

// import styles
import './HomePage.css'

// import UsersList from './components/UsersList';
// import User from './components/User';

const HomePage = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const [loaded, setLoaded] = useState(true);

   useEffect(() => {
      // (async () => {
      //    await dispatch(authenticate());
      //    setLoaded(true);
      // })();
   }, [dispatch]);

   if (!loaded) {
      return null;
   } else {
      return (
         <div>
            <h1>Home PAGE!!!</h1>
            <ServerListComponent />
            <LogoutButton />
         </div>
      )

   }
}

export default HomePage;
