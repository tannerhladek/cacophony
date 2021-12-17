import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import LogoutButton from '../auth/LogoutButton'
import ServerListComponent from '../ServerListComponent/ServerListComponent';
import ServerChannelList from '../ServerChannelListComponent/ServerChannelListComponent';
import ServerDetailsComponent from '../ServerDetailsComponents/ServerDetailsComponent';

// thunk import

// import styles
import './HomePage.css'

// import UsersList from './components/UsersList';
// import User from './components/User';

const HomePage = () => {

   return (
      <div className='main-container'>
         <div className='server-list-container'>
            <ServerListComponent />
         </div>
         <div className='server-info-container'>
            <Switch>
               <Route exact path={["/servers/:serverId", "/servers/:serverId/:channelId"]}>
                  {/* TO DO: insert div for server info/editing/deleting */}
                  <ServerDetailsComponent />
                  <ServerChannelList />
               </Route>
            </Switch>
            <LogoutButton />
         </div>
      </div>
   )
}

export default HomePage;
