// component import
import SplashNavBar from './SplashNavBar';
import SplashImage from './assets/Chat_12.png'

//import styles
import './SplashPage.css'

const SplashPage = () => {
   return (
      <div id='splash-page-container'>
         <SplashNavBar />
         <div className='splash-img-container'>
            <img className='splash-img' src={SplashImage} alt='splash' />
         </div>
         <div id='external-links-container'>
            {/* TO DO: insert external links */}
            external links
         </div>
      </div>
   );
}

export default SplashPage;
