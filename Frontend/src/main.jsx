import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GlobalProviderdish from "./Context/Contextvardish.jsx";
import { BrowserRouter } from "react-router-dom";
import GlobalProvidername from "./Context/Contextvarname.jsx";
import GlobalProviderprice from "./Context/Contextvarprice.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalProviderprice>
    <GlobalProvidername>
      <GlobalProviderdish>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalProviderdish>
    </GlobalProvidername>
  </GlobalProviderprice>
);
