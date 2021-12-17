import { useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

// thunk import
// import { getChannelsThunk } from "../../store/servers";

const ServerChannelList = () => {
   const { serverId } = useParams();
   const serverChannels = useSelector(state => state.servers[serverId]?.channels);

   const serverChannelsArr = Object.assign([], serverChannels)

   return (
      <div>
         <h4>Channels...</h4>
         {serverChannelsArr.map(channel => (
            <div key={channel.id}>
               <NavLink to={`/servers/${serverId}/channels/${channel.id}`}>
                  {channel.name}
               </NavLink>
            </div>
         ))}
      </div>
   )

};

export default ServerChannelList;
