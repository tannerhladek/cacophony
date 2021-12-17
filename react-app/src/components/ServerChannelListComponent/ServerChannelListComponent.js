import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// thunk import
import { getChannelsThunk } from "../../store/servers";

const ServerChannelList = () => {
   const dispatch = useDispatch();
   const { serverId } = useParams();
   const server = useSelector(state => state.servers[serverId]);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      (async () => {
         await dispatch(getChannelsThunk(serverId));
         setLoaded(true)
      })()
   }, [serverId])

   const serverChannels = Object.assign([], server?.channels)

   if (!loaded) {
      return null
   } else {

      return (
         <div>
            <h3>Server's channel List</h3>
            {serverChannels.map(channel => (
               <div key={channel.id}>
                  {channel.name}
               </div>
            ))}
         </div>
      )
   }
};

export default ServerChannelList;
