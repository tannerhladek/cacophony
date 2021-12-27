import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// thunk import
import { deleteMessageThunk } from "../../store/messages";


const SingleMessageComponent = ({ message }) => {
   const dispatch = useDispatch();
   const { channelId } = useParams();
   const sessionUser = useSelector(state => state.session.user);

   const handleMessageDelete = async () => {
      dispatch(deleteMessageThunk(message));
      // TO DO: insert error handling
   }


   return (
      <div className="single-message-container">
         {/* TO DO: insert profile image component */}
         {/* <div className="message-user-profile-image">
            <img src={message.user.profile_image_url}/>
         </div> */}
         <div className="message-info">
            <h4>{message.user.username}</h4>
            <p>
               {message.content}
            </p>
         </div>
         {sessionUser.id === message.user.id && (
            <>
               <button onClick={handleMessageDelete}>Delete</button>
            </>
         )}
      </div>
   )
};


export default SingleMessageComponent;
