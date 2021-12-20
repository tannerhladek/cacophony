import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// thunk import
import { getChannelMessagesThunk } from "../../store/messages";

const MessagesComponent = () => {
   const dispatch = useDispatch();
   const { channelId } = useParams();
   const channelMessages = useSelector(state => state.messages[channelId]);
   const [loaded, setLoaded] = useState(false);

   const channelMessagesArr = Object.assign([], channelMessages);
   const channelMessagesArrsorted = channelMessagesArr.sort((a,b) => {
      return new Date(b.created_at) - new Date(a.created_at)
   });

   useEffect(() => {
      (async () => {
         await dispatch(getChannelMessagesThunk(channelId));
         setLoaded(true)
      })()
   }, [dispatch, channelId])

   if (!loaded) {
      return null
   } else {
      return (
         <div className='messages-container'>
            {channelMessagesArrsorted.map(message => (
               <p key={message.id}>
                  {message.content}
               </p>
            ))}
         </div>
      )
   }
};

export default MessagesComponent;
