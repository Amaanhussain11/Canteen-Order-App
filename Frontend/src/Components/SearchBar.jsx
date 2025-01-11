import React, { useState, useContext } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { RiFileList3Fill } from "react-icons/ri";
import { GlobalContextdish } from "../Context/Contextvardish";
import { GlobalContextname } from "../Context/Contextvarname";
import { GlobalContextprice } from "../Context/Contextvarprice";

//Creating Search Bar

const SearchBar = () => {
  const [dishname, setdishname] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [dishlistarr, setdishlistarr] = useContext(GlobalContextdish);
  const [namelist, setnamelist] = useContext(GlobalContextname);
  const [pricelist, setpricelist] = useContext(GlobalContextprice);

  // Adding the searched dishes to the list
  const handleadddish = (dishname, dishprice) => {
    const name = prompt("Enter the name of recipient");
    setpricelist([...pricelist, dishprice]);
    setnamelist([...namelist, name]);
    setdishlistarr([...dishlistarr, dishname]);
  };

  // Setting the input field
  const handlechange = (e) => {
    setdishname(e.target.value);
  };

  // Fetching search results
  const handlesearch = async () => {
    if (dishname === "") {
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5555/Dishes/search?&name=${dishname}`
      );
      setsearchresult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <div className="flex justify-center w-full">
        <Link to="/list">
          <RiFileList3Fill fontSize={30} />
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          onChange={handlechange}
          placeholder="Search Dishes"
          value={dishname}
          className="w-full py-3 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <IoSearch
          onClick={handlesearch}
          className="absolute right-3 top-3 cursor-pointer text-xl text-blue-500"
        />
      </div>

      {/* Search Results */}
      <div className="w-full max-w-md space-y-4">
        {searchresult.length > 0 ? (
          <div className="space-y-4">
            {searchresult.map((res, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {res.name}
                  </h3>
                  <p className="text-gray-600">${res.price}</p>
                </div>
                <div className="flex justify-end p-4">
                  <CiSquarePlus
                    fontSize={30}
                    className="cursor-pointer text-green-500 hover:text-green-700"
                    onClick={() => {
                      handleadddish(res.name, res.price);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No results found for "{dishname}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
