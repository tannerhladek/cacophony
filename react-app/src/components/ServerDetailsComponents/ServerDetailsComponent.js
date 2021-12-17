import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getServersThunk } from "../../store/servers";

// thunk import

const ServerDetailsComponent = () => {
   const dispatch = useDispatch();
   const { serverId } = useParams();
   const server = useSelector(state => state.servers[serverId]);
   const [loaded, setLoaded] = useState(false);

   console.log(server);

   const handleServerDeletion = () => {

   }

   if (!server) {
      return null;
   } else {
      return (
         <div>
            <h4>{server.name}</h4>
            <button onClick={handleServerDeletion}>Delete</button>
            <button>Edit</button>
         </div>
      )
   };
};

export default ServerDetailsComponent;
