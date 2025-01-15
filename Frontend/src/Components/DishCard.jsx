import React, { useContext, useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaPlusSquare } from "react-icons/fa";
import { GlobalContextdish } from "../Context/Contextvardish";
import { GlobalContextname } from "../Context/Contextvarname";
import { GlobalContextprice } from "../Context/Contextvarprice";
import Swal from "sweetalert2";

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
  const handleadddish = async (dishname, dishprice) => {
    // const name = prompt("Enter your name")
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
    // console.log(name)
    setpricelist([...pricelist, dishprice]);
    setnamelist([...namelist, name]);
    setdishlistarr([...dishlistarr, dishname]);
  };

  return (
    <div className="w-full mt-4 space-y-4 bg-[#FFF4E6]">
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
              } // Placeholder image if `imageLink` is missing
              alt={res.name}
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>

          {/* Name, Price, and Add Button Section */}
          <div className="flex justify-between items-center mt-3 px-4">
            <div>
              <h3 className="text-base font-bold text-gray-800">{res.name}</h3>
              <p className="text-sm text-gray-600 mt-1">₹{res.price}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  handleadddish(res.name, res.price);
                }}
                className="flex items-center justify-center hover:opacity-80"
              >
                <FaPlusSquare fontSize={28} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DishCard;
