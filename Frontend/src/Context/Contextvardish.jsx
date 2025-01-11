import { createContext, useState } from "react";

export const GlobalContextdish = createContext();

const GlobalProviderdish = ({ children }) => {
  const [dishListArr, setDishListArr] = useState([]);
  return (
    <GlobalContextdish.Provider value={[dishListArr, setDishListArr]}>
      {children}
    </GlobalContextdish.Provider>
  );
};

export default GlobalProviderdish;