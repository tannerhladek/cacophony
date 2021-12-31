import { useState } from 'react';
import { useDispatch } from 'react-redux';

// thunk import
import { editMessageThunk } from '../../store/messages';

const EditSingleMessage = ({ message, setShowMessageEditForm }) => {
   const dispatch = useDispatch();
   const [messageContent, setMessageContent] = useState(message.content);

   const handleEditSubmission = async (e) => {
      e.preventDefault()
      const editedMessage = {
         content: messageContent,
         id: message.id
      }
      await dispatch(editMessageThunk(editedMessage));
      setShowMessageEditForm(false)
   }

   return (
      <div className='edit-msg-form-container'>
         <form onSubmit={handleEditSubmission} className='edit-msg-form'>
            <textarea
               className='edit-msg-input'
               value={messageContent}
               onChange={(e) => setMessageContent(e.target.value)}
            />
         </form>
         <div className='edit-msg-link-container'>
            <a onClick={(e) => setShowMessageEditForm(false)}>Cancel</a>
            <button onClick={handleEditSubmission} className='edit-msg-submit-btn'>Submit</button>
         </div>
      </div>
   )
}

export default EditSingleMessage;
