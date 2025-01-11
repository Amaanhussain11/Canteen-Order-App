import { createContext, useState } from "react";

export const GlobalContextname = createContext();

const GlobalProvidername = ({ children }) => {
  const [namelist, setnamelist] = useState([])

  return (
    <GlobalContextname.Provider value={[namelist, setnamelist]}>
      {children}
    </GlobalContextname.Provider>
  );
};

export default GlobalProvidername;