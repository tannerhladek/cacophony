import { useSelector } from 'react-redux';

// component imports
import LogoutButton from '../auth/LogoutButton'

const UserDetails = () => {
   const sessionUser = useSelector(state => state.session.user);

   return (
      <div id='user-details-component-container'>
         <div id='user-details-component'>
            User details comp.
            <LogoutButton />
         </div>
      </div>
   );
}
export default UserDetails;
