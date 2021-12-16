import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
            <h1>ServerList</h1>
            <div>
               {serversArr.map(server => {
                  return (
                     <div key={server.id}>
                        {server.name}
                     </div>
                     // <NavLink key={server.id} to={``}>
                     //    {server.name}
                     // </NavLink>
                  )
               })}
            </div>
         </div>
      )

   }
}

export default ServerListComponent;
