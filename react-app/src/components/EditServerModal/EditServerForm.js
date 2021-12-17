import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

// thunk import
// import { addServerThunk } from '../../store/servers';

// styles imports

const EditServerForm = ({ hideForm }) => {
   const { serverId } = useParams();
   const dispatch = useDispatch();
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers);
   const [errors, setErrors] = useState([]);

   const server = servers[serverId]
   const [serverName, setServerName] = useState(server['name']);
   let server_image_url = server.server_image_url;
   let url;
   if (server_image_url === 'https://cdn.discordapp.com/attachments/920424165415223356/920525286800490546/default_server_image.png') url = ''
   else url = server_image_url
   const [serverImageUrl, setServerImageUrl] = useState(url);


   const editServer = async (e) => {
      e.preventDefault();
      // const data = {
      //    name: serverName,
      //    server_image_url: serverImageUrl
      // }
      // const data = await dispatch(editServerThunk({data, serverId}));
      // if (!data) {
      //    hideForm()
      // } else {
      //    setErrors(data)
      // }
   };

   return (
      <div className='server-form-modal-container'>
         <div className='server-form-container'>
            <div>Edit this server</div>
            <form onSubmit={editServer}>
               <div>
                  {errors.map((error, ind) => (
                     <div key={ind}>{error}</div>
                  ))}
               </div>
               <div>
                  <div>NAME</div>
                  <input
                     type='text'
                     name='serverName'
                     onChange={(e) => setServerName(e.target.value)}
                     value={serverName}
                  ></input>
               </div>
               <div>
                  <div>SERVER_IMAGE_URL</div>
                  <input
                     type='text'
                     name='serverImageUrl'
                     onChange={(e) => setServerImageUrl(e.target.value)}
                     value={serverImageUrl}
                  ></input>
               </div>
               <button type='submit'>Create</button>
            </form>
            <button onClick={hideForm}>Canel</button>
         </div>
      </div>
   );

};

export default EditServerForm;
