import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// thunk import
// import { getChannelsThunk } from "../../store/servers";

const ServerChannelList = () => {
   const dispatch = useDispatch();
   const { serverId } = useParams();
   const serverChannels = useSelector(state => state.servers[serverId]?.channels);

   const serverChannelsArr = Object.assign([], serverChannels)

   return (
      <div>
         <h3>Server's channel List</h3>
         {serverChannelsArr.map(channel => (
            <div key={channel.id}>
               {channel.name}
            </div>
         ))}
      </div>
   )

};

export default ServerChannelList;
