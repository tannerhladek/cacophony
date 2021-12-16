import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import CreateServerModal from '../CreateServerModal'

// thunk imports
import { getServersThunk } from '../../store/servers';

// style imports
import './HomePage.css'

const ServerListComponent = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers)
   const [loaded, setLoaded] = useState(true);

   const serversArr = Object.values(servers)

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
         <div>
            <div>
               {serversArr.map(server => {
                  return (
                     <div key={server.id}>
                        {server.name}
                     </div>
                     // TO DO:
                     // <NavLink key={server.id} to={``}>
                     //    {server.name}
                     // </NavLink>
                  )
               })}
            </div>
            <div>
               <CreateServerModal />
            </div>
         </div>
      )

   }
}

export default ServerListComponent;
