import { useState } from 'react';

// component import
import { Modal } from '../../context/Modal';
import EditServerForm from './EditServerForm';

function EditServerModal() {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <span>
         <button onClick={(e) => setShowModal(true)}>Edit</button>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <EditServerForm hideForm={hideForm} />
            </Modal>
         )}
      </span>
   );
}

export default EditServerModal;
