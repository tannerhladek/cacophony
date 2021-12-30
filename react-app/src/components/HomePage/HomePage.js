import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

// component imports
import UserDetails from '../UserDetailsComponent/UserDetailsComponent';
import ServerListComponent from '../ServerListComponent/ServerListComponent';
import ServerChannelList from '../ServerChannelListComponent/ServerChannelListComponent';
import ServerDetailsComponent from '../ServerDetailsComponents/ServerDetailsComponent';
import HeaderRightComponent from '../HeaderRightComponent/HeaderRightComponent';
import MessagesComponent from '../MessagesComponent/MessagesComponent';
import CreateMessageForm from '../CreateMessageComponent/CreateMessageComponent';
// import UsersList from './components/UsersList';
// import User from './components/User';

// thunk imports
import * as MessageActions from '../../store/messages';

// import styles
import './HomePage.css'

let socket;

const HomePage = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      // open socket connection
      // create websocket
      socket = io();
      socket.on("add_message", (message) => {
         dispatch(MessageActions.addMessage(message))
      });
      socket.on("delete_message", (data => {
         dispatch(MessageActions.deleteMessage(data))
      }));

      // when component unmounts, disconnect
      return (() => {
         socket.disconnect()
      });
   }, [])

   return (
      <div className='main-container'>
         <div className='left-pane'>
            <ServerListComponent />
         </div>
         <div className='server-info-container'>
            <Switch>
               <Route exact path={["/servers/:serverId", "/servers/:serverId/channels/:channelId"]}>
                  <ServerDetailsComponent />
                  <ServerChannelList />
               </Route>
            </Switch>
            <UserDetails />
         </div>
         <div className='right-pane'>
            <Switch>
               <Route exact path={["/servers/:serverId"]}>
                  <HeaderRightComponent />
               </Route>
               <Route exact path={["/servers/:serverId/channels/:channelId", "/servers/:serverId/channels/:channelId"]}>
                  <HeaderRightComponent />
                  <MessagesComponent />
                  <CreateMessageForm />
               </Route>
            </Switch>
         </div>
      </div>
   )
}

export default HomePage;
