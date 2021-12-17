import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

// thunk import
import { deleteServerThunk } from "../../store/servers";

const ServerDetailsComponent = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const { serverId } = useParams();
   const server = useSelector(state => state.servers[serverId]);
   const [loaded, setLoaded] = useState(false);

   const handleServerDeletion = async () => {
      const data = await dispatch(deleteServerThunk(serverId));
      return history.push('/');
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
