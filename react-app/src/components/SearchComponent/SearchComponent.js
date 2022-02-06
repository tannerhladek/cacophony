import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

// component imports
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

// style import
import "./SearchComponent.css"

const SearchComponent = () => {

   // const [loaded, setLoaded] = useState(false);
   const [results, setResults] = useState([])
   const [showResults, setShowResults] = useState(false);

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
         const resArr = Object.values(results);
         console.log(resArr[0]);
         setResults(resArr);
         setShowResults(true);
         return
      }
   };

   const debouncedSearch = useCallback(debounce(search, 1000));

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
         {results.length > 0 && showResults && (
            <div className="server-search-results-container">
               {results.map(server => (
                  <Card key={server.id} sx={{ maxWidth: 250 }}>
                     <CardMedia
                        component="img"
                        height="100"
                        image={server.server_image_url}
                        alt="green iguana"
                        id='search-card-image'
                     />
                     <CardContent className="server-card-content-container">
                        <div>
                           {server.name}
                        </div>
                        <div>
                           {`${Object.keys(server.members).length} members`}
                        </div>
                        <CardActions>
                           <button>
                              Join
                           </button>
                        </CardActions>
                     </CardContent>
                  </Card>
               ))}
            </div>
         )}
      </div>
   )

};

export default SearchComponent;
