import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

// thunk import
// import { getChannelsThunk } from "../../store/servers";

const MessagesComponent = () => {
   const dispatch = useDispatch();
   const { serverId, channelId } = useParams();
   const sessionUser = useSelector(state => state.session.user);
   const [loaded, setLoaded] = useState();

   useEffect(() => {

   }, [dispatch])

   return (
      <div>
         Messages component
      </div>
   )

};

export default MessagesComponent;
