import React, { useState, useContext } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { GlobalContextdish } from "../Context/Contextvardish";
import { GlobalContextname } from "../Context/Contextvarname";
import { GlobalContextprice } from "../Context/Contextvarprice";
import Swal from "sweetalert2";

const SearchBar = () => {
  const [dishname, setdishname] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false); // Toggle search bar
  const [dishlistarr, setdishlistarr] = useContext(GlobalContextdish);
  const [namelist, setnamelist] = useContext(GlobalContextname);
  const [pricelist, setpricelist] = useContext(GlobalContextprice);

  const handleadddish = async (dishname, dishprice) => {
    const { value: name } = await Swal.fire({
      title: "Enter recipient's Name",
      input: "text",
      // inputLabel: "Your IP address",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      }
    });
    setpricelist([...pricelist, dishprice]);
    setnamelist([...namelist, name]);
    setdishlistarr([...dishlistarr, dishname]);
  };

  const handlechange = (e) => {
    setdishname(e.target.value);
  };

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

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      setsearchresult([]); // Clear search results when closing the search bar
      setdishname(""); // Clear the input field
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-[#DB8F4D] text-[#3E2327]">
      {/* Top Section: List and Search Icon */}
      <div className="flex items-center w-full justify-between">
        <Link to="/list" className="text-[#3E2327] flex justify-center items-center">
          <RiFileList3Fill fontSize={28} className="text-[#3E2327]" />
        </Link>
        {showSearchBar ? (
          <IoClose
            onClick={toggleSearchBar}
            fontSize={30}
            className="cursor-pointer text-xl text-[#3E2327]"
          />
        ) : (
          <IoSearch
            onClick={toggleSearchBar}
            fontSize={30}
            className="cursor-pointer text-xl text-[#3E2327]"
          />
        )}
      </div>

      {/* Search Bar Section */}
      {showSearchBar && (
        <div className="relative w-full max-w-md mt-4 text-[#3E2327]">
          <input
            type="text"
            onChange={handlechange}
            placeholder="Search Dishes"
            value={dishname}
            className="placeholder-[#3E2327] w-full py-3 px-4 rounded-lg border-2 border-[#3E2327] focus:outline-none focus:ring-0 bg-[#DB8F4D] text-[#3E2327]"
          />
          <button
            onClick={handlesearch}
            className="absolute right-3 top-3 text-black-500 font-bold"
          >
            Search
          </button>
        </div>
      )}

      {/* Search Results */}
      {showSearchBar && searchresult.length > 0 && (
        <div className="w-full mt-4 space-y-4">
          {searchresult.map((res, index) => (
            <div
              key={index}
              className="w-full max-w-[375px] mx-auto bg-[#FAD7A0] rounded-[20px] p-4 flex flex-col shadow-md"
            >
              {/* Image Section */}
              <div className="w-full h-[150px] flex items-center justify-center overflow-hidden bg-white rounded-[20px]">
                <img
                  src={res.imageLink || "https://media.istockphoto.com/id/1409919858/photo/delicious-indian-street-food-egg-rolls-is-ready-to-eat.jpg?s=612x612&w=0&k=20&c=7b-uTwR8qmESV_nP3Rsh4qqKCay4vsG_B7j0UhaMFPY="} // Replace with the actual image or placeholder
                  alt={res.name}
                  className="w-full h-full object-cover rounded-[20px]"
                />
              </div>

              {/* Name, Price, and Add Button Section */}
              <div className="flex justify-between items-center mt-3 px-4">
                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    {res.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">₹{res.price}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleadddish(res.name, res.price);
                    }}
                    className=" flex items-center justify-center  hover:opacity-80"
                  >
                    <FaPlusSquare fontSize={28} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
