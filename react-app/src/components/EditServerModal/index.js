import { useState } from 'react';

// component import
import SettingsIcon from '@mui/icons-material/Settings';
import { Modal } from '../../context/Modal';
import EditServerForm from './EditServerForm';

function EditServerModal() {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <>
         <SettingsIcon onClick={(e) => setShowModal(true)} id='settings-icon'/>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <EditServerForm hideForm={hideForm} />
            </Modal>
         )}
      </>
   );
}

export default EditServerModal;
