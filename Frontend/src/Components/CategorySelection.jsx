import React, { useState } from "react";
import DishCard from "./DishCard";
import { BiMenuAltLeft } from "react-icons/bi";

function Dropdown() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false); // Close the sidebar after selection
  };

  const categories = ["All","Starter" ,"Veg", "Non-Veg","Sweets"];

  return (
    <div className=" min-h-screen relative flex flex-col items-center p-6 bg-[#FFF4E6] rounded-lg shadow-lg space-y-6 pb-[100px]">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between">
        {/* Menu Icon */}
        <button
          className="text-gray-700 text-2xl flex"
          onClick={() => setIsSidebarOpen(true)}
        >
          <BiMenuAltLeft />
          <h2 className="text-lg font-semibold text-gray-700 mx-1">Category</h2>
        </button>

        {/* Selected Category */}
        <p className="text-gray-700 font-medium">{selectedCategory || "All"}</p>
      </div>

      {/* Sidebar */}
      <div
        className={` fixed inset-0 transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={` fixed top-0 left-0 h-full w-64 bg-[#FFF4E6] shadow-lg p-6 flex flex-col space-y-4 z-60 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h3 className="text-lg font-bold text-[#3E2327]">Select Category</h3>
          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className="text-[#3E2327] rounded-xl bg-[#FAD7A0] font-medium text-left w-full border flex justify-center items-center h-[40px]"
                  onClick={(e) => {
                    handleCategorySelect(category);
                    e.stopPropagation();
                    {
                      category === "All"
                        ? setSelectedCategory("")
                        : setSelectedCategory(category);
                    }
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Close Sidebar */}
        <button
          className="absolute inset-0 w-full h-full -z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></button>
      </div>

      {/* Dish Cards */}
      <DishCard category={selectedCategory} />
    </div>
  );
}

export default Dropdown;
