import { react, useState } from "react";
import SearchBar from "./Components/SearchBar";
import { Routes, Route } from "react-router-dom";
import Dishlist from "./Components/Dishlist";
import CategorySelection from "./Components/CategorySelection";
import Adminpanel from "./Components/Adminpanel";
import AdminLogin from "./Components/AdminLogin";
import Addnewdish from "./Components/Addnewdish";
import UpdateDish from "./Components/Updatedish";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SearchBar />
            <CategorySelection />
          </>
        }
      />
      <Route path="/list" element={<Dishlist />} />
      <Route path="/Adlogin" element={<AdminLogin />} />
      <Route path="/adminpanel" element={<Adminpanel />} />
      <Route path="/adminpanel/addnewdish" element={<Addnewdish />} />
      <Route path="/update-dish/:id" element={<UpdateDish />} />

    </Routes>
  );
}

export default App;
