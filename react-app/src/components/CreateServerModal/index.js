import { useState } from 'react';

// component import
import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';

function CreateServerModal() {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <div>
         <a onClick={() => setShowModal(true)} className='create-server-btn'>
            <img src='https://cdn.discordapp.com/attachments/920424165415223356/921079799642992740/server_add_btn.png' alt='create-server-link' />
         </a>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <CreateServerForm hideForm={hideForm} />
            </Modal>
         )}
      </div>
   );
}

export default CreateServerModal;
