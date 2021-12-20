import { useState } from 'react';

// component import
import { Modal } from '../../context/Modal';
import CreateChannelForm from './CreateChannelForm';

function CreateChannelModal() {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <span>
         <button onClick={(e) => setShowModal(true)}>Add Chan</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <CreateChannelForm hideForm={hideForm} />
            </Modal>
         )}
      </span>
   );
}

export default CreateChannelModal;
