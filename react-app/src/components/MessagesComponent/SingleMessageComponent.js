import { useSelector } from "react-redux";


const SingleMessageComponent = ({ message }) => {
   const sessionUser = useSelector(state => state.session.user);

   const handleMessageDelete = async () => {
      
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
