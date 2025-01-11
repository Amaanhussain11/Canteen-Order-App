import React, { useContext, useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { GlobalContextdish } from "../Context/Contextvardish";
import { GlobalContextname } from "../Context/Contextvarname";
import { GlobalContextprice } from "../Context/Contextvarprice";

function DishCard({ category }) {
  // calling hooks
  const [searchresult, setsearchresult] = useState([]);
  const [namelist, setnamelist] = useContext(GlobalContextname);
  const [dishlistarr, setdishlistarr] = useContext(GlobalContextdish);
  const [pricelist, setpricelist] = useContext(GlobalContextprice);

  // Fetching the data from backend
  useEffect(() => {
    fetch(`http://localhost:5555/Dishes/category/${category}`)
      .then((res) => res.json())
      .then((data) => setsearchresult(data))
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  // A function to handle adding a dish and name of the recipient
  const handleadddish = (dishname, dishprice) => {
    const name = prompt("Enter the name of recipient");
    setpricelist([...pricelist, dishprice]);
    setnamelist([...namelist, name]);
    setdishlistarr([...dishlistarr, dishname]);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Available Dishes
      </h3>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {searchresult.map((res, index) => (
          <li
            key={index}
            className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center space-y-4"
          >
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-700">
                {res.name}
              </h4>
              <p className="text-gray-500 text-sm">Price: ₹{res.price}</p>
            </div>
            <CiSquarePlus
              fontSize={40}
              className="text-blue-500 cursor-pointer hover:text-blue-600"
              onClick={() => handleadddish(res.name, res.price)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DishCard;
