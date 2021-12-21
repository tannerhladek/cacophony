import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

// thunk import
// import { addChannelThunk } from '../../store/servers'

// styles imports
import './CreateMessageComponent.css'

const CreateMessageForm = () => {
   const dispatch = useDispatch();
   const { channelId } = useParams();
   const [errors, setErrors] = useState([]);

   const [messageContent, setMessageContent] = useState('');

   const createMessage = async (e) => {
      e.preventDefault();
      const payload = {
         content: messageContent,
         channelId
      }
      // const data = await dispatch(addChannelThunk(payload));
      // if (!data) {
      //    hideForm()
      // } else {
      //    setErrors(data)
      // }
   };

   return (
      <>
         <form onSubmit={createMessage}>
            <div>
               {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
               ))}
            </div>
            <input
               type='text'
               name='messageContent'
               onChange={(e) => setMessageContent(e.target.value)}
               value={messageContent}
               placeholder={`Message`}
               className='create-message-form-input'
            ></input>
         </form>
      </>
   );

};

export default CreateMessageForm;
