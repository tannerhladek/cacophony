import { Route, Switch } from 'react-router-dom';

// component imports
import UserDetails from '../UserDetailsComponent/UserDetailsComponent';
import ServerListComponent from '../ServerListComponent/ServerListComponent';
import ServerChannelList from '../ServerChannelListComponent/ServerChannelListComponent';
import ServerDetailsComponent from '../ServerDetailsComponents/ServerDetailsComponent';
import HeaderRightComponent from '../HeaderRightComponent/HeaderRightComponent';
import MessagesComponent from '../MessagesComponent/MessagesComponent';
import CreateMessageForm from '../CreateMessageComponent/CreateMessageComponent';


// import styles
import './HomePage.css'

// import UsersList from './components/UsersList';
// import User from './components/User';

const HomePage = () => {

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
