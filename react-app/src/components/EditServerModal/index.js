import { useState } from 'react';

// component import
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Modal } from '../../context/Modal';
import EditServerForm from './EditServerForm';

function EditServerModal() {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <>
         <KeyboardArrowDownIcon onClick={(e) => setShowModal(true)} className='settings-icon'/>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <EditServerForm hideForm={hideForm} />
            </Modal>
         )}
      </>
   );
}

export default EditServerModal;
