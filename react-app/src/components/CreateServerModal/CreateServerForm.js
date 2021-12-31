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
      if (typeof (data) === 'number') {
         hideForm()
         return history.push(`/servers/${data}`)
      } else {
         setErrors(data)
      }
   };

   return (
      <div className='server-form-modal-container'>
         <div className='server-channel-form-container'>
            <div className='form-title'>Create a Server</div>
            <form onSubmit={createServer}>
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
                  ></input>
               </div>
               <button type='submit' className='submit-btn'>Create</button>
            </form>
            <div>
               <a onClick={hideForm}>Cancel</a>
            </div>
         </div>
      </div>
   );

};

export default CreateServerForm;
