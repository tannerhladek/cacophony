import { useState } from 'react';

// component import
import SettingsIcon from '@mui/icons-material/Settings';
import { Modal } from '../../context/Modal';
import EditChannelForm from './EditChannelForm';

function EditChannelModal({ channelId }) {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <>
         <SettingsIcon onClick={(e) => setShowModal(true)} className='settings-icon'/>
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <EditChannelForm hideForm={hideForm} channelId={channelId} />
            </Modal>
         )}
      </>
   );
}

export default EditChannelModal;
