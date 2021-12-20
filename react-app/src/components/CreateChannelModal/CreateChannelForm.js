import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

// thunk import
import { addChannelThunk } from '../../store/servers'

// styles imports

const CreateChannelForm = ({ hideForm }) => {
   const dispatch = useDispatch();
   const { serverId } = useParams();
   const [errors, setErrors] = useState([]);

   const [channelName, setChannelName] = useState('');

   const createChannel = async (e) => {
      e.preventDefault();
      const payload = {
         name: channelName,
         serverId
      }
      const data = await dispatch(addChannelThunk(payload));
      if (!data) {
         hideForm()
      } else {
         setErrors(data)
      }
   };

   return (
      <div className='channel-form-modal-container'>
         <div className='channel-form-container'>
            <div>Create a channel</div>
            <form onSubmit={createChannel}>
               <div>
                  {errors.map((error, ind) => (
                     <div key={ind}>{error}</div>
                  ))}
               </div>
               <div>
                  <div>NAME</div>
                  <input
                     type='text'
                     name='channelName'
                     onChange={(e) => setChannelName(e.target.value)}
                     value={channelName}
                  ></input>
               </div>
               <button type='submit'>Create Channel</button>
            </form>
            <button onClick={hideForm}>Cacnel</button>
         </div>
      </div>
   );

};

export default CreateChannelForm;
