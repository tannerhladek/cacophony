import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

// thunk import
import { editChannelThunk, deleteChannelThunk } from '../../store/servers';

// styles imports

const EditChannelForm = ({ hideForm, channelId }) => {
   const { serverId } = useParams();
   const dispatch = useDispatch();
   const servers = useSelector(state => state.servers);
   const [errors, setErrors] = useState([]);

   const channel = servers[serverId].channels[channelId]
   const [channelName, setChannelName] = useState(channel['name']);

   const editChannel = async (e) => {
      e.preventDefault();
      console.log('HERE EDIT CHANNEL')
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

   const handleDelete = async (e) => {
      console.log('HERE DELETE')
      const data = await dispatch(deleteChannelThunk(e.target.value));
      if (data) {
         setErrors(data);
      }
   };

   return (
      <div className='channel-form-modal-container'>
         <div className='server-channel-form-container'>
            <div className='form-title'>Edit this channel</div>
            <form>
               <div>
                  {errors.map((error, ind) => (
                     <div key={ind}>{error}</div>
                  ))}
               </div>
               <div className='form-box'>
                  <div className='form-label'>NAME</div>
                  <input
                     type='text'
                     name='channelName'
                     onChange={(e) => setChannelName(e.target.value)}
                     value={channelName}
                  />
               </div>
               <button onClick={editChannel} className='submit-btn'>Submit Edits</button>
            </form>
            <div className='form-alt-links'>
               <div>
                  <a onClick={hideForm}>Cancel</a>
               </div>
               <div>
                  <a onClick={handleDelete} id='delete-link'>Delete Channel</a>
               </div>
            </div>
         </div>
      </div>
   );

};

export default EditChannelForm;
