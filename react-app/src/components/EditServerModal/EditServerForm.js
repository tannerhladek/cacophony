import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';

// thunk import
import { editServerThunk, deleteServerThunk } from '../../store/servers';

// styles imports

const EditServerForm = ({ hideForm }) => {
   const { serverId } = useParams();
   const dispatch = useDispatch();
   const history = useHistory();
   const servers = useSelector(state => state.servers);
   const [errors, setErrors] = useState([]);

   const server = servers[serverId]
   const [serverName, setServerName] = useState(server['name']);
   let server_image_url = server.server_image_url;
   let url;
   if (server_image_url === 'https://cdn.discordapp.com/attachments/920424165415223356/926879518906548324/default_server_image.png') url = ''
   else url = server_image_url
   const [serverImageUrl, setServerImageUrl] = useState(url);


   const editServer = async (e) => {
      e.preventDefault();
      const payload = {
         id: serverId,
         name: serverName,
         server_image_url: serverImageUrl
      }
      const data = await dispatch(editServerThunk(payload));
      if (!data) {
         hideForm()
      } else {
         setErrors(data)
      }
   };

   const handleServerDeletion = async () => {
      const data = await dispatch(deleteServerThunk(serverId));
      return history.push('/');
   };

   return (
      <div className='server-form-modal-container'>
         <div className='server-channel-form-container'>
            <div className='form-title'>Edit this server</div>
            <form onSubmit={editServer}>
               <div>
                  {errors.map((error, ind) => (
                     <div key={ind}>{error}</div>
                  ))}
               </div>
               <div className='form-box'>
                  <div className='form-label'>NAME</div>
                  <input
                     type='text'
                     name='serverName'
                     onChange={(e) => setServerName(e.target.value)}
                     value={serverName}
                  ></input>
               </div>
               <div className='form-box'>
                  <div className='form-label'>SERVER_IMAGE_URL</div>
                  <input
                     type='text'
                     name='serverImageUrl'
                     onChange={(e) => setServerImageUrl(e.target.value)}
                     value={serverImageUrl}
                  />
               </div>
               <button type='submit' className='submit-btn'>Submit Edits</button>
            </form>
            <div className='form-alt-links'>
               <div>
                  <a onClick={hideForm}>Cancel</a>
               </div>
               <div>
                  <a onClick={handleServerDeletion} id='delete-link'>Delete Server</a>
               </div>
            </div>
         </div>
      </div>
   );

};

export default EditServerForm;
