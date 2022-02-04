import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

// component imports

// thunk import

// style import


const SearchComponent = () => {

   // const [loaded, setLoaded] = useState(false);
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
      const { value } = e.target
      if (value.length < 2) {
         setShowResults(false);
         return;
      }
      // const response = await fetch(`/api/activities/search/${value}`)
      // if (response.ok) {
      //    const results = await response.json();
      //    setResults(results);
      //    setShowResults(true);
      //    return
      // }
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
