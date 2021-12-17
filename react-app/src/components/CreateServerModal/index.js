import { useState } from 'react';

// component import
import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';

function CreateServerModal() {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <div className='server-btn'>
         <div onClick={() => setShowModal(true)} className='server-image-container'>
            <img src='https://cdn.discordapp.com/attachments/920424165415223356/921079799642992740/server_add_btn.png' alt='create-server-link' className='server-image' />
         </div>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <CreateServerForm hideForm={hideForm} />
            </Modal>
         )}
      </div>
   );
}

export default CreateServerModal;
