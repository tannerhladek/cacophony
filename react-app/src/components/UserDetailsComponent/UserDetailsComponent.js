import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// component imports
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutButton from '../auth/LogoutButton'

const UserDetails = () => {
   const sessionUser = useSelector(state => state.session.user);
   const [showMenu, setShowMenu] = useState(false);

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
         setShowMenu(false);
      };
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener("click", closeMenu);

   }, [showMenu]);


   return (
      <div id='user-details-parent-container'>
         <div id='user-details-container'>
            <div className="user-profile-image">
               <img src={sessionUser.profile_image_url} />
            </div>
            <div>
               {sessionUser.username}
            </div>
            <SettingsIcon onClick={openMenu} className='settings-icon' id='user-settings-icon' />
         </div>
         {showMenu && (
            <div id='logout-btn-container'>
               <LogoutButton />
            </div>
         )}
      </div>
   );
}
export default UserDetails;
