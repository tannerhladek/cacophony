import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

// component imports
import SingleMessageComponent from "./SingleMessageComponent";

// thunk import
import { getChannelMessagesThunk } from "../../store/messages";

// style import
import './MessagesComponent.css';


const MessagesComponent = () => {
   const dispatch = useDispatch();
   const { channelId } = useParams();
   const location = useLocation();
   const messages = useSelector(state => state.messages);

   const channelMessages = messages[channelId];
   const channelMessagesArr = Object.assign([], channelMessages);
   const channelMessagesArrsorted = channelMessagesArr.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at)
   });

   const scrollToBottom = () => {
      document.querySelector('.bottom-scroll')?.scrollIntoView({ behavior: "auto" })
   };

   useEffect(() => {
      if (!(channelId in messages)) {
         (async () => {
            await dispatch(getChannelMessagesThunk(channelId));
         })()
      }
      scrollToBottom();

   }, [dispatch, location, channelMessagesArr.length]);


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
};

export default MessagesComponent;
