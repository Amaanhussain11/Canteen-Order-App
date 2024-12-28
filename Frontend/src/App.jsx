import {react, useState} from "react";
import SearchBar from "./Components/SearchBar";
import DishCard from "./Components/DishCard";
import Dishlist from "./Components/Dishlist";

function App() {
  

  return (
    <>
      <h1 className="m-4">Hello</h1>
      <SearchBar />
      <DishCard/>
      <Dishlist/>
    </>
  )
}

export default App
