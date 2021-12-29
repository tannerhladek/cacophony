import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// component import
import EditSingleMessage from "./EditSingleMessageComponent";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

// thunk import
import { deleteMessageThunk } from "../../store/messages";


const SingleMessageComponent = ({ message }) => {
   const dispatch = useDispatch();
   const [showMessageEditForm, setShowMessageEditForm] = useState(false);
   const sessionUser = useSelector(state => state.session.user);

   const handleMessageDelete = async () => {
      dispatch(deleteMessageThunk(message));
      // TO DO: insert error handling
   };


   return (
      <div className="single-message-parent-container">
         <div className="message-user-profile-image">
            <img src={message.user.profile_image_url} />
         </div>
         <div className="message-info">
            <div>
               {message.user.username}
            </div>
            {!showMessageEditForm && (
               <>
                  <p>
                     {message.content}
                  </p>
                  {sessionUser.id === message.user.id && (
                     <div>
                        <DeleteForeverIcon onClick={handleMessageDelete} id='delete-msg-icon'/>
                        <EditIcon onClick={() => setShowMessageEditForm(true)} id='edit-msg-icon'/>
                     </div>
                  )}
               </>
            )}
            {showMessageEditForm && (
               <EditSingleMessage message={message} setShowMessageEditForm={setShowMessageEditForm} />
            )}
         </div>
      </div>
   )
};


export default SingleMessageComponent;
