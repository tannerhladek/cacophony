import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// component imports
import SingleMessageComponent from "./SingleMessageComponent";

// thunk import
import { getChannelMessagesThunk } from "../../store/messages";

// style import
import './MessagesComponent.css';


const MessagesComponent = () => {

   const dispatch = useDispatch();
   const { channelId } = useParams();
   const messages = useSelector(state => state.messages);
   const [loaded, setLoaded] = useState(false);

   const channelMessages = messages[channelId];
   const channelMessagesArr = Object.assign([], channelMessages);
   const channelMessagesArrsorted = channelMessagesArr.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at)
   });

   const scrollToBottom = () => {
      document.querySelector('.bottom-scroll')?.scrollIntoView({ behavior: "auto" })
   };

   useEffect(() => {
      if (!loaded) {
         (async () => {
            await dispatch(getChannelMessagesThunk(channelId));
            setLoaded(true)
         })()
      }
      scrollToBottom();
   }, [dispatch, channelMessagesArr]);




   if (!loaded) {
      return null
   } else {
      return (
         <div className="messages-parent-container">
            <div className='messages-container'>
               {channelMessagesArrsorted.map(message => (
                  <SingleMessageComponent message={message} key={message.id} />
               ))}
            </div>
            <div className="bottom-scroll"></div>
         </div>
      )
   }
};

export default MessagesComponent;
