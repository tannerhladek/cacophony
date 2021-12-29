// component import
import SplashNavBar from './SplashNavBar';
import SplashImage from './assets/Chat_12.png';
import SplashFooterBar from './SplashFooterBar';

//import styles
import './SplashPage.css'

const SplashPage = () => {
   return (
      <div id='splash-page-container'>
         <SplashNavBar />
         <div className='splash-img-container'>
            <img className='splash-img' src={SplashImage} alt='splash' />
         </div>
         <div className='splash-content-container'>
            <span id='splash-tagline'>
               IMAGINE A PLACE...
            </span>
            <div id='splash-phrase'>
               ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
            </div>
         </div>
         <div id='external-links-container'>
            <SplashFooterBar />
         </div>
      </div>
   );
}

export default SplashPage;
