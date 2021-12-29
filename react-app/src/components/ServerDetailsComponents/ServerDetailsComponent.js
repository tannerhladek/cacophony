import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

// component import
import EditServerModal from "../EditServerModal";

const ServerDetailsComponent = () => {
   const dispatch = useDispatch();
   const { serverId } = useParams();
   const server = useSelector(state => state.servers[serverId]);
   const sessionUser = useSelector(state => state.session.user);

   if (!server) {
      return null;
   } else {

      let buttons;
      if (server.owner_id === sessionUser.id) {
         buttons = (
            <>
               <EditServerModal />
            </>
         )
      }

      return (
         <div id='server-details'>
            <div id='server-name'>{server.name}</div>
            {buttons}
         </div>
      )
   };
};

export default ServerDetailsComponent;
