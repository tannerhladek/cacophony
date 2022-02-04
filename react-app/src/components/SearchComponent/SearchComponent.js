import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

// component imports

// thunk import

// style import


const SearchComponent = () => {

   // const [loaded, setLoaded] = useState(false);
   const [results, setResults] = useState(null)
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
      // const response = await fetch(`/api/servers/discover`, {
      //    method: "POST",
      //    headers: { "Content-Type": "application/json" },
      //    body: JSON.stringify(value)
      // });
      const payload = { 'name': name };
      const response = await fetch(`/api/servers/discover`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload)
      });
      console.log('YOU ARE HERE')
      if (response.ok) {
         const results = await response.json();
         console.log(results)
         setResults(results);
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
      </div>
   )

};

export default SearchComponent;
