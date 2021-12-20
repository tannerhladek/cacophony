import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

// thunk import
import { addServerThunk } from '../../store/servers';

// styles imports

const CreateServerForm = ({ hideForm }) => {
   const dispatch = useDispatch();
   const history = useHistory();

   const [errors, setErrors] = useState([]);
   const [serverName, setServerName] = useState('');
   const [serverImageUrl, setServerImageUrl] = useState('');

   const createServer = async (e) => {
      e.preventDefault();
      const new_server = {
         name: serverName,
         server_image_url: serverImageUrl
      }
      const data = await dispatch(addServerThunk(new_server));
      if (typeof(data) === 'number') {
         hideForm()
         return history.push(`/servers/${data}`)
      } else {
         setErrors(data)
      }
   };

   return (
      <div className='server-form-modal-container'>
         <div className='server-form-container'>
            <div>Create a Server</div>
            <form onSubmit={createServer}>
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
            <button onClick={hideForm}>Cancel</button>
         </div>
      </div>
   );

};

export default CreateServerForm;
