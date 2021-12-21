import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// component imports
import CreateMessageForm from "../CreateMessageComponent/CreateMessageComponent";

// thunk import
import { getChannelMessagesThunk } from "../../store/messages";

// style import
import './MessagesComponent.css';


const MessagesComponent = () => {
   const dispatch = useDispatch();
   const { channelId } = useParams();
   const channelMessages = useSelector(state => state.messages[channelId]);
   const [loaded, setLoaded] = useState(false);

   const channelMessagesArr = Object.assign([], channelMessages);
   const channelMessagesArrsorted = channelMessagesArr.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at)
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
         <div className="messages-component-container">
            <div className='messages-container'>
               {channelMessagesArrsorted.map(message => (
                  <p key={message.id}>
                     {message.content}
                  </p>
               ))}
            </div>
            <div>
               <CreateMessageForm />
            </div>
         </div>
      )
   }
};

export default MessagesComponent;
