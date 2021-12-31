import { useState } from 'react';

// component import
import { Modal } from '../../context/Modal';
import AddIcon from '@mui/icons-material/Add';
import CreateChannelForm from './CreateChannelForm';

function CreateChannelModal() {
   const [showModal, setShowModal] = useState(false);
   const hideForm = () => setShowModal(false)

   return (
      <>
         <AddIcon onClick={(e) => setShowModal(true)} className='AddIcon' />
         {showModal && (
            <Modal onClose={() => setShowModal(false)}>
               <CreateChannelForm hideForm={hideForm} />
            </Modal>
         )}
      </>
   );
}

export default CreateChannelModal;
