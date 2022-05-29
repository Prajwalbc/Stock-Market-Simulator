import React, { useState } from "react";

import SearchScripInfoContext from "../context/SearchScripInfoContext";

function SearchScripInfoContextProvider({ children }) {
  const [scripInfo, setScripInfo] = useState([]);

  return (
    <SearchScripInfoContext.Provider value={{ scripInfo, setScripInfo }}>
      {children}
    </SearchScripInfoContext.Provider>
  );
}

export default SearchScripInfoContextProvider;
