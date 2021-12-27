import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const HeaderRightComponent = () => {
   const { serverId, channelId } = useParams();
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers);

   const channel = servers[serverId]?.channels[channelId]

   return (
      <div>
         {/* Header Right, serverId: {serverId}, channelId: {channelId} */}
         <h1># {channel?.name}</h1>
      </div>
   )
};

export default HeaderRightComponent
