import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

// component import
import EditChannelModal from "../EditChannelModal";

// thunk import


const ServerChannelList = () => {
   const { serverId } = useParams();
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers);
   const serverChannels = useSelector(state => state.servers[serverId]?.channels);

   const serverChannelsArr = Object.assign([], serverChannels);
   // const serverChannelsArrSorted = serverChannelsArr.sort((a,b) => {
   //    if (b.owner_id === sessionUser.id) return -1
   //    else return 1
   // });

   const handleEdit = () => {

   }

   const handleDelete = () => {

   }


   return (
      <div>
         <h4>Channels...</h4>
         {serverChannelsArr.map(channel => (
            <div key={channel.id}>
               <span>
                  <NavLink to={`/servers/${serverId}/channels/${channel.id}`}>
                     {channel.name}
                  </NavLink>
               </span>
               {sessionUser.id === servers[serverId].owner_id && (
                  <>
                     <EditChannelModal channelId={channel?.id} />
                     <button onClick={handleDelete}>
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
