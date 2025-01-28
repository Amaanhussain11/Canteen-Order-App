import React, { useContext } from "react";
import { RiFileList3Fill } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";
import { GlobalContextprice } from "../Context/Contextvarprice";
import { Link, useLocation } from "react-router-dom";

const Stickyfooter = () => {
  const [pricelist] = useContext(GlobalContextprice);
  const Total = pricelist.reduce((sum, num) => sum + num, 0);
  const location = useLocation();

  // Determine button text, target path, and icon
  const isOnHomePage = location.pathname === "/";
  const buttonText = isOnHomePage ? "Place Order" : "Pay Now";
  const targetPath = isOnHomePage ? "/list" : "/payment";
  const IconComponent = isOnHomePage ? RiFileList3Fill : FaRegCreditCard;

  return (
    <div className="text-[#3E2723] fixed bottom-0 left-0 right-0 bg-[#DB8F4D] w-full h-[13%] flex items-center justify-between">
      {/* Total Orders */}
      <div className="mx-4">Total Orders - ₹{Total}</div>

      {/* Toggle Button */}
      <Link
        className="mx-4 h-[70px] w-[100px] bg-[#7DCEA0] rounded-xl flex justify-between items-center"
        to={Total > 0 ? targetPath : "/"}
      >
        <span className="mx-2">
          <IconComponent fontSize={40} />
        </span>
        <span className="text-sm w-fit">{buttonText}</span>
      </Link>
    </div>
  );
};

export default Stickyfooter;
