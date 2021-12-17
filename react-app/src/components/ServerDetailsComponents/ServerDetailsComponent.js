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
   const sessionUser = useSelector(state => state.session.user)
   const [loaded, setLoaded] = useState(false);

   const handleServerDeletion = async () => {
      const data = await dispatch(deleteServerThunk(serverId));
      return history.push('/');
   }

   if (!server) {
      return null;
   } else {

      let buttons;
      if (server.owner_id === sessionUser.id) {
         buttons = (
            <>
               <button onClick={handleServerDeletion}>Delete</button>
               <button>Edit</button>
            </>
         )
      }

      return (
         <div>
            <h4>{server.name}</h4>
            {buttons}
         </div>
      )
   };
};

export default ServerDetailsComponent;
