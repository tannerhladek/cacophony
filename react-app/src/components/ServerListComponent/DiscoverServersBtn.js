import { useHistory } from 'react-router-dom';

// component import
import ExploreIcon from '@mui/icons-material/Explore';

function DiscoverServersBtn() {
   const history = useHistory();

   const handleRedirect = () => {
      return history.push('/discover')
   }

   return (
      <div className='server-btn' onClick={handleRedirect}>
         <button className='new-server-btn' id='discover-server-icon'>
            <ExploreIcon />
         </button>
      </div>
   );
}

export default DiscoverServersBtn;
