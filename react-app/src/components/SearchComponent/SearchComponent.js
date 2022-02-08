import { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

// thunk import
import { joinServerThunk } from "../../store/servers";

// component imports
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

// style import
import "./SearchComponent.css"
import { height } from "@mui/system";

const SearchComponent = () => {
   const history = useHistory();
   const dispatch = useDispatch();

   const user = useSelector(state => state.session.user);
   const servers = useSelector(state => state.servers);
   // const [loaded, setLoaded] = useState(false);
   const [results, setResults] = useState(null);
   const [resultsArr, setResultsArr] = useState([])
   const [showResults, setShowResults] = useState(false);
   const [errors, setErrors] = useState([]);

   // TO DO: implement default search page content
   // useEffect(() => {
   //    (async () => {
   //       const res = await fetch('/api/servers/discover')
   //       if (res.ok) {
   //          const servers = await res.json();
   //       }
   //    })()
   // })

   const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
         const later = () => {
            clearTimeout(timeout);
            func(...args);
         };
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
      };
   };

   const search = async (e) => {
      const name = e.target.value
      if (name.length < 2) {
         setShowResults(false);
         return;
      }
      const payload = { 'name': name };
      const response = await fetch(`/api/servers/discover`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload)
      });
      if (response.ok) {
         const results = await response.json();
         setResults(results);
         const resArr = Object.values(results);
         setResultsArr(resArr);
         setShowResults(true);
         return
      }
   };

   const debouncedSearch = useCallback(debounce(search, 1000));

   const handleRedirect = (e) => {
      const serverId = e.target.value
      return history.push(`/servers/${serverId}`)
   };

   const joinServer = async (e) => {
      const serverId = e.target.value;
      const data = await dispatch(joinServerThunk(serverId));
      if (!data) {
         setErrors([])
         return history.push(`/servers/${serverId}`);
      } else {
         setErrors(data)
      }
   };

   return (
      <div className="search-container">
         <div className="search-input-container">
            <input
               placeholder="Search for Communities."
               id='search-input'
               type='text'
               onChange={debouncedSearch}
            />
         </div>
         {resultsArr.length > 0 && showResults && (
            <div className="server-search-results-container">
               {resultsArr.map(server => {
                  if (server.id in servers) {
                     return (
                        <Card key={server.id} sx={{ width: 225, height: 266 }}>
                           <CardMedia
                              component="img"
                              height="100"
                              image={server.server_image_url}
                              alt="server"
                              id='search-card-image'
                           />
                           <CardContent className="server-card-content-container">
                              <div className="search-card-title">
                                 {server.name}
                              </div>
                              <div>
                                 {`${Object.keys(server.members).length} members`}
                              </div>
                              <CardActions id="search-card-actions">
                                 <button onClick={handleRedirect} value={server?.id} className='search-server-btn'>
                                    Already a member.
                                 </button>
                              </CardActions>
                           </CardContent>
                        </Card>
                     )
                  } else {
                     return (
                        <Card key={server.id} sx={{ width: 225, height: 266 }}>
                           <CardMedia
                              component="img"
                              height="100"
                              image={server.server_image_url}
                              alt="server"
                              id='search-card-image'
                           />
                           <CardContent className="server-card-content-container">
                              <div className="search-card-title">
                                 {server.name}
                              </div>
                              <div>
                                 {`${Object.keys(server.members).length} members`}
                              </div>
                              <CardActions id="search-card-actions">
                                 <button onClick={joinServer} value={server?.id} className='search-server-btn' id='join-server-btn'>
                                    Join
                                 </button>
                              </CardActions>
                           </CardContent>
                        </Card>
                     )
                  }
               })}
            </div>
         )}
      </div>
   )

};

export default SearchComponent;
