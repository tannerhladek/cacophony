import { useState } from 'react';

// component import
import { Modal } from '../../context/Modal';
import EditChannelForm from './EditChannelForm';

function EditChannelModal({ channelId }) {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <span>
         <button onClick={(e) => setShowModal(true)}>Edit</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <EditChannelForm hideForm={hideForm} channelId={channelId} />
            </Modal>
         )}
      </span>
   );
}

export default EditChannelModal;
