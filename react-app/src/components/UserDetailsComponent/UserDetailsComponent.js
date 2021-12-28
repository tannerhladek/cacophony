import { useSelector } from 'react-redux';
import { useState } from 'react';

// component imports
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutButton from '../auth/LogoutButton'

const UserDetails = () => {
   const sessionUser = useSelector(state => state.session.user);
   const [divVisibility, setVisibility] = useState(false)

   const handleVisibility = () => {
      if (!divVisibility) setVisibility(true);
      else setVisibility(false);
   };

   return (
      <div id='user-details-parent-container'>
         <div id='user-details-container'>
            User details comp.
            <SettingsIcon onClick={handleVisibility} className='settings-icon' id='user-settings-icon'/>
         </div>
         {divVisibility && (
            <div id='logout-btn-container'>
               <LogoutButton />
            </div>
         )}
      </div>
   );
}
export default UserDetails;
