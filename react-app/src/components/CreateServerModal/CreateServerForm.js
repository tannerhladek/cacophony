import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

// thunk import

// styles imports

const CreateServerForm = ({ hideForm }) => {
   const [errors, setErrors] = useState([]);
   const [serverName, setServerName] = useState('');
   const [serverImageUrl, setServerImageUrl] = useState('');
   const sessionUser = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers)
   const dispatch = useDispatch();

   const createServer = async (e) => {
      e.preventDefault();

   };

   return (
      <div className='create-server-form-modal-container'>
         <div className='create-server-form-container'>
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
            <button onClick={hideForm}>Canel</button>
         </div>
      </div>
   );

};

export default CreateServerForm;
