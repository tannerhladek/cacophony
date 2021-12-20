import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const HeaderRightComponent = () => {
   const sessionUser = useSelector(state => state.session.user);

   const { serverId, channelId } = useParams();

   return (
      <div>
         Header Right, serverId: {serverId}, channelId: {channelId}
      </div>
   )
};

export default HeaderRightComponent
