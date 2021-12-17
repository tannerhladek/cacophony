import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// thunk import

const ServerChannelList = () => {
   const dispatch = useDispatch();
   const servers = useSelector(state => state.servers);
   const [loaded, setLoaded] = useState(false);

   // useEffect(() => {
   //    (async () => {
   //       await
   //    })
   // })

   // TO DO: invert boolean
   if (loaded) {
      return null
   } else {

      return (
         <div>
            <h3>Server's channel List</h3>
         </div>
      )
   }
};

export default ServerChannelList;
