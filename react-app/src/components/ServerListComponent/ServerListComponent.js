import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import CreateServerModal from '../CreateServerModal';
import ServerLinkTile from './ServerTile';
import DiscoverServersBtn from './DiscoverServersBtn';

// thunk imports
import { getServersThunk } from '../../store/servers';

// style imports
import './ServerListComponent.css'

const ServerListComponent = () => {
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers)
   const [loaded, setLoaded] = useState(true);

   const serversArr = Object.values(servers).sort((a,b) => {
      if (b.owner_id === sessionUser.id) return 1
      else return -1
   })

   useEffect(() => {
      (async () => {
         await dispatch(getServersThunk(sessionUser.id));
         setLoaded(true);
      })();
   }, [dispatch]);

   if (!loaded) {
      return null;
   } else {
      return (
         <div className='server-list-div'>
            <div className='server-list-container'>
               {serversArr.map(server => {
                  return (
                     <ServerLinkTile key={server.id} server={server} />
                  )
               })}
            </div>
            <div>
               <CreateServerModal />
            </div>
            <div>
               <DiscoverServersBtn />
            </div>
         </div>
      )

   }
}

export default ServerListComponent;
