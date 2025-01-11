import { createContext, useState } from "react";

export const GlobalContextprice = createContext();

const GlobalProviderprice = ({ children }) => {
  const [pricelist, setpricelist] = useState([])

  return (
    <GlobalContextprice.Provider value={[pricelist, setpricelist]}>
      {children}
    </GlobalContextprice.Provider>
  );
};

export default GlobalProviderprice;