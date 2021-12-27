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
      <div className=''>
         <form onSubmit={handleEditSubmission} className=''>
            <textarea
               className='edit-comment-text-area-dj'
               value={messageContent}
               onChange={(e) => setMessageContent(e.target.value)}
            />
            <button type="submit" className=''>Submit</button>
         </form>
      </div>
   )
}

export default EditSingleMessage;
