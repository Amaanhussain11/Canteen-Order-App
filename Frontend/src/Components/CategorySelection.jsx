// // import React, { useState } from "react";
// // import DishCard from "./DishCard";

// // function Dropdown() {
// //   const [selectedCategory, setSelectedCategory] = useState("");

// //   const handleCategoryChange = (event) => {
// //     setSelectedCategory(event.target.value);
// //   };

// //   return (
// //     <div className="flex flex-col items-center p-6 bg-[#FFF4E6] rounded-lg shadow-lg space-y-6">
// //       <label htmlFor="category" className="text-lg font-semibold text-gray-700">
// //         Select a Category:
// //       </label>
// //       <select
// //         id="category"
// //         className="w-72 p-3 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         value={selectedCategory}
// //         onChange={handleCategoryChange}
// //       >
// //         <option value="" className="text-gray-400">
// //           --Choose a category--
// //         </option>
// //         <option value="Veg" className="text-gray-700">
// //           Veg
// //         </option>
// //         <option value="Non-Veg" className="text-gray-700">
// //           Non-Veg
// //         </option>
// //         <option value="Dairy" className="text-gray-700">
// //           Dairy
// //         </option>
// //       </select>

// //       <DishCard category={selectedCategory} />
// //     </div>
// //   );
// // }

// // export default Dropdown;

// import React, { useState } from "react";
// import DishCard from "./DishCard";
// import { BiMenuAltLeft } from "react-icons/bi";

// function Dropdown() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleCategorySelect = (category) => {
//     alert("Clicked");
//     setSelectedCategory(category);
//     setIsSidebarOpen(false); // Close the sidebar after selection
//   };

//   const categories = ["Veg", "Non-Veg", "Dairy"];

//   return (
//     <div className="min-h-screen relative flex flex-col items-center p-6 bg-[#FFF4E6] rounded-lg shadow-lg space-y-6 ease-in-out">
//       {/* Top Bar */}
//       <div className="w-full flex items-center justify-between">
//         {/* Menu Icon */}
//         <button
//           className="text-gray-700 text-2xl flex "
//           onClick={() => setIsSidebarOpen(true)}
//         >
//           <BiMenuAltLeft />

//           <h2 className="text-lg font-semibold text-gray-700 mx-1">
//           Category
//         </h2>
//         </button>

//         {/* Title */}

//         {/* Selected Category */}
//         <p className="text-gray-700 font-medium">{selectedCategory || "All"}</p>
//       </div>

//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
//           <div className="relative w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-4 z-60">
//             {" "}
//             {/* Increased z-index */}
//             <h3 className="text-lg font-bold text-gray-800">Select Category</h3>
//             <ul className="space-y-4">
//               {categories.map((category) => (
//                 <li key={category} className="" >
//                   <button
//                     className="text-gray-700 font-medium text-left w-full text-red-600"
//                     onClick={()=>console.log("clicked")}
//                   >
//                     {category}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {/* Close Sidebar */}
//           <button
//             className="absolute inset-0 w-full h-full"
//             onClick={() => setIsSidebarOpen(false)}
//           ></button>
//         </div>
//       )}

//       {/* Dish Cards */}

//       <DishCard category={selectedCategory} />
//     </div>
//   );
// }

// export default Dropdown;

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

  const categories = ["Veg", "Non-Veg", "Dairy"];

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
