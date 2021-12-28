import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// style import
import './HeaderRightComponent.css'


const HeaderRightComponent = () => {
   const { serverId, channelId } = useParams();
   const servers = useSelector(state => state.servers);

   const channel = servers[serverId]?.channels[channelId]

   return (
      <div id='header-right'>
         {/* Header Right, serverId: {serverId}, channelId: {channelId} */}
         <h1>{channel?.name}</h1>
      </div>
   )
};

export default HeaderRightComponent
