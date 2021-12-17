import { useState } from 'react';
import { Redirect } from 'react-router-dom';

// component import

function ServerLinkTile({server}) {

   const handleRedirect = (e) => {
      return
   }

   return (
      <div className='server-btn'>
         <div onClick={handleRedirect} className='server-image-container'>
            <img src={server.server_image_url} alt='server-link' className='server-image' />
         </div>
      </div>
   );
}

export default ServerLinkTile;
