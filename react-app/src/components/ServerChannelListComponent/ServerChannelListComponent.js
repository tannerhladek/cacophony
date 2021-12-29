import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

// component import
import CreateChannelModal from "../CreateChannelModal";
import EditChannelModal from "../EditChannelModal";

// styles import
import './ServerChannelListComponent.css'

const ServerChannelList = () => {
   const dispatch = useDispatch();
   const { serverId } = useParams();
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers);
   const serverChannels = useSelector(state => state.servers[serverId]?.channels);

   const serverChannelsArr = Object.assign([], serverChannels);

   return (
      <div className="channels-parent-container">
         <div className="channels-container">
            <div id='channel-title-div'>
               <span>CHANNELS</span>
               {sessionUser?.id === servers[serverId]?.owner_id && (
                  <>
                     <CreateChannelModal />
                  </>
               )}
            </div>
            {serverChannelsArr.map(channel => (
               <NavLink key={channel.id} className="single-channel-name-div" to={`/servers/${serverId}/channels/${channel.id}`}>
                  {`# ${channel.name}`}
                  {sessionUser?.id === servers[serverId]?.owner_id && (
                     <>
                        <EditChannelModal channelId={channel?.id} />
                     </>
                  )}
               </NavLink>
            ))}
         </div>
      </div>

   )

};

export default ServerChannelList;
