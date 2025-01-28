import React, { useState, useContext, useEffect } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import axios from "axios";
import { auth, provider } from "./GoogleSignin/config.js"; // Import your Firebase config
import { signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { GlobalContextdish } from "../Context/Contextvardish";
import { GlobalContextname } from "../Context/Contextvarname";
import { GlobalContextprice } from "../Context/Contextvarprice";
import { RiAdminLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import Spinner from "./Spinner";

const SearchBar = () => {
  const [dishname, setdishname] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false); // Toggle search bar
  const [dishlistarr, setdishlistarr] = useContext(GlobalContextdish);
  const [namelist, setnamelist] = useContext(GlobalContextname);
  const [pricelist, setpricelist] = useContext(GlobalContextprice);
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(null); // Track logged-in user
  const [showDropdown, setShowDropdown] = useState(false);

  // checking if user is present or not
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle Google Sign-In
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  // Handle Sign-Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  // sign out drop down
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownSignOut = () => {
    setShowDropdown(false);
    handleSignOut();
  };

  const handleadddish = async (dishname, dishprice) => {
    const { value: name } = await Swal.fire({
      title: "Enter recipient's Name",
      input: "text",
      // inputLabel: "Your IP address",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
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
      setloading(true);
      const res = await axios.get(
        `https://canteen-order-app-4.onrender.com/Dishes/search?&name=${dishname}`
      );
      setsearchresult(res.data);
      setloading(false);
    } catch (err) {
      console.error(err);
      setloading(false);
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
        {user ? (
          <div className="">
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
              title="Sign Out"
            />

            {/* Dropdown Menu */}
            <div className="">
              {showDropdown && (
                <div className="absolute left-0 mt-2 w-fit bg-[#DB8F4D] border-white border-2  rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleDropdownSignOut}
                    className="w-full flex text-left px-4 py-2  text-[#3E2327] rounded-t-lg"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex  justify-normal items-center">
            <FaRegUserCircle
              fontSize={28}
              className="cursor-pointer text-[#3E2327]"
              onClick={handleSignIn}
              title="Sign In with Google"
            />
            <span className="px-1 flex justify-center items-center">Continue with <FcGoogle className="px-1" fontSize={30}/></span>
          </div>
        )}
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
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="w-16 h-16" color="border-red-700" />
        </div>
      ) : (
        showSearchBar &&
        searchresult.length > 0 && (
          <div className="w-full mt-4 space-y-4">
            {searchresult.map((res, index) => (
              <div
                key={index}
                className="w-full max-w-[375px] mx-auto bg-[#FAD7A0] rounded-[20px] p-4 flex flex-col shadow-md"
              >
                {/* Image Section */}
                <div className="w-full h-[150px] flex items-center justify-center overflow-hidden bg-white rounded-[20px]">
                  <img
                    src={
                      res.imageLink ||
                      "https://media.istockphoto.com/id/1409919858/photo/delicious-indian-street-food-egg-rolls-is-ready-to-eat.jpg?s=612x612&w=0&k=20&c=7b-uTwR8qmESV_nP3Rsh4qqKCay4vsG_B7j0UhaMFPY="
                    } // Replace with the actual image or placeholder
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
        )
      )}
    </div>
  );
};

export default SearchBar;
