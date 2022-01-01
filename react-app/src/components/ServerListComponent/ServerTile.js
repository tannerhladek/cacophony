import { NavLink } from 'react-router-dom';

function ServerLinkTile({ server }) {

   return (
      <div className='server-btn'>
         <NavLink to={`/servers/${server.id}`} className='server-image-container'>
            <img src={server.server_image_url} alt='server-link' className='server-image' />
         </NavLink>
      </div>
   );
}

export default ServerLinkTile;
