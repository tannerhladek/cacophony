import { NavLink } from 'react-router-dom';

//component import
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SplashFooterBar = () => {

   return (
      <div className='splash-footer-container'>
         <div className='splash-nav-bar'>
            <ul>
               <li className='splash-footer-li'>
                  <a href='https://github.com/tannerhladek/cacophony'>
                     <GitHubIcon />
                     <span>
                        Cacophony Repo
                     </span>
                  </a>
               </li>
               <li className='splash-footer-li'>
                  <a href='https://www.linkedin.com/in/tannerhladek/'>
                     <LinkedInIcon />
                     <span>
                        Tanner Hladek
                     </span>
                  </a>
               </li>
            </ul>
         </div>
      </div>

   );
}

export default SplashFooterBar;
