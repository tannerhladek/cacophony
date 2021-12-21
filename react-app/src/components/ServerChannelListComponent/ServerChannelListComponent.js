import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

// component import
import CreateChannelModal from "../CreateChannelModal";
import EditChannelModal from "../EditChannelModal";

// thunk import
import { deleteChannelThunk } from "../../store/servers";

const ServerChannelList = () => {
   const dispatch = useDispatch();
   const { serverId } = useParams();
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers);
   const serverChannels = useSelector(state => state.servers[serverId]?.channels);
   const [errors, setErrors] = useState([]);

   const serverChannelsArr = Object.assign([], serverChannels);
   // const serverChannelsArrSorted = serverChannelsArr.sort((a,b) => {
   //    if (b.owner_id === sessionUser.id) return -1
   //    else return 1
   // });

   const handleDelete = async (e) => {
      const data = await dispatch(deleteChannelThunk(e.target.value));
      if (data) {
         setErrors(data);
      }
   };

   return (
      <div>
         <h4>Channels...</h4>
         {sessionUser?.id === servers[serverId]?.owner_id && (
            <>
               <CreateChannelModal />
            </>
         )}
         {serverChannelsArr.map(channel => (
            <div key={channel.id}>
               <span>
                  <NavLink to={`/servers/${serverId}/channels/${channel.id}`}>
                     {channel.name}
                  </NavLink>
               </span>
               {sessionUser?.id === servers[serverId]?.owner_id && (
                  <>
                     <EditChannelModal channelId={channel?.id} />
                     <button onClick={handleDelete} value={channel?.id}>
                        Delete
                     </button>
                  </>
               )}
            </div>
         ))}
      </div>
   )

};

export default ServerChannelList;
