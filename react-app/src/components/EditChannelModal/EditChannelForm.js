import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

// thunk import
import { editChannelThunk } from '../../store/servers';

// styles imports

const EditChannelForm = ({ hideForm, channelId }) => {
   const { serverId } = useParams();
   const dispatch = useDispatch();
   const servers = useSelector(state => state.servers);
   const [errors, setErrors] = useState([]);

   const channel = servers[serverId].channels[channelId]
   const [channelName, setChannelName] = useState(channel?.name);

   const editChannel = async (e) => {
      e.preventDefault();
      const payload = {
         id: channelId,
         name: channelName,
      };
      const data = await dispatch(editChannelThunk(payload));
      if (!data) {
         hideForm()
      } else {
         setErrors(data)
      }
   };

   return (
      <div className='channel-form-modal-container'>
         <div className='channel-form-container'>
            <div>Edit this channel</div>
            <form onSubmit={editChannel}>
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
               <button type='submit'>Submit Edits</button>
            </form>
            <button onClick={hideForm}>Cacnel</button>
         </div>
      </div>
   );

};

export default EditChannelForm;
