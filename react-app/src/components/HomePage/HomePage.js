import React, { useState, useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import LogoutButton from '../auth/LogoutButton'
import ServerListComponent from '../ServerListComponent/ServerListComponent';

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
         <div className='main-container'>
            <div className='server-list-container'>
               <ServerListComponent />
            </div>
            <div className='server-info-container'>
               <Switch>
                  <LogoutButton />
               </Switch>
            </div>
         </div>
      )

   }
}

export default HomePage;
