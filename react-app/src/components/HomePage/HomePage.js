import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import LogoutButton from '../auth/LogoutButton'
import ServerListComponent from '../ServerListComponent/ServerListComponent';
import ServerChannelList from '../ServerChannelListComponent/ServerChannelListComponent';
import ServerDetailsComponent from '../ServerDetailsComponents/ServerDetailsComponent';
import HeaderRightComponent from '../HeaderRightComponent/HeaderRightComponent';
import MessagesComponent from '../MessagesComponent/MessagesComponent';

// thunk import

// import styles
import './HomePage.css'

// import UsersList from './components/UsersList';
// import User from './components/User';

const HomePage = () => {

   return (
      <div className='main-container'>
         <div>
            <ServerListComponent />
         </div>
         <div className='server-info-container'>
            <Switch>
               <Route exact path={["/servers/:serverId", "/servers/:serverId/channels/:channelId"]}>
                  <ServerDetailsComponent />
                  <ServerChannelList />
               </Route>
            </Switch>
            <LogoutButton />
         </div>
         <div>
            <Switch>
               <Route exact path={["/servers/:serverId"]}>
                  <HeaderRightComponent />
               </Route>
               <Route exact path={["/servers/:serverId/channels/:channelId", "/servers/:serverId/channels/:channelId"]}>
                  <HeaderRightComponent />
                  <MessagesComponent />
               </Route>
            </Switch>
         </div>
      </div>
   )
}

export default HomePage;
