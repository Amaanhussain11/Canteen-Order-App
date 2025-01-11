import React, { useState } from "react";
import DishCard from "./DishCard";

function Dropdown() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg space-y-6">
      <label htmlFor="category" className="text-lg font-semibold text-gray-700">
        Select a Category:
      </label>
      <select
        id="category"
        className="w-72 p-3 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="" className="text-gray-400">
          --Choose a category--
        </option>
        <option value="Veg" className="text-gray-700">
          Veg
        </option>
        <option value="Non-Veg" className="text-gray-700">
          Non-Veg
        </option>
        <option value="Dairy" className="text-gray-700">
          Dairy
        </option>
      </select>

      <DishCard category={selectedCategory} />
    </div>
  );
}

export default Dropdown;
