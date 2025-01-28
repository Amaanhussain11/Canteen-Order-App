import React, { useContext } from "react";
import { GlobalContextdish } from "../Context/Contextvardish";
import { GlobalContextname } from "../Context/Contextvarname";
import { GlobalContextprice } from "../Context/Contextvarprice";
import { RiFileList3Line } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Stickyfooter from "./Stickyfooter";

const Dishlist = () => {
  const [namelist, setNamelist] = useContext(GlobalContextname);
  const [dishlistarr, setDishlistarr] = useContext(GlobalContextdish);
  const [pricelist, setPricelist] = useContext(GlobalContextprice);

  let nestedOrders = {};
  namelist.forEach((name, index) => {
    const dish = dishlistarr[index];
    const price = pricelist[index];

    if (!nestedOrders[name]) {
      nestedOrders[name] = [];
    }

    const existingDish = nestedOrders[name].find(
      (order) => order.dishname === dish && order.price === price
    );

    if (existingDish) {
      existingDish.quantity += 1;
    } else {
      nestedOrders[name].push({
        dishname: dish,
        price: price,
        quantity: 1,
        index,
      });
    }
  });

  const Total = pricelist.reduce((sum, num) => sum + num, 0);

  // Remove Dish Function
  const removeDish = (index) => {
    const newDishlist = [...dishlistarr];
    const newNamelist = [...namelist];
    const newPricelist = [...pricelist];

    newDishlist.splice(index, 1);
    newNamelist.splice(index, 1);
    newPricelist.splice(index, 1);

    setDishlistarr(newDishlist);
    setNamelist(newNamelist);
    setPricelist(newPricelist);
  };

  return (
    
    <div className="min-h-screen bg-[#FFF4E6] flex flex-col pb-[100px]">
      {/* Sticky Header */}
      <header className="sticky top-0 w-full bg-[#DB8F4D] flex items-center px-4 shadow-lg h-[80px] justify-end">
        <Link to="/" className="ml-20">
          <GoHomeFill fontSize={30} />
        </Link>
      </header>

      <span className="mt-8 flex items-center text-lg font-semibold space-x-2 p-4 text-black">
        <RiFileList3Line fontSize={30} />
        <span>Your Orders</span>
      </span>

      {/* Main Section */}
      <div className="flex-1 p-4 space-y-6">
        {Object.entries(nestedOrders).map(([name, orders]) => (
          <div
            key={name}
            className="p-3 bg-[#FAD7A0] rounded-xl shadow-md text-[#3E2723] space-y-2"
          >
            {/* User Name */}
            <h3 className="font-bold text-lg">{name}</h3>

            {/* Orders */}
            {orders.map((order) => (
              <div
                key={order.index}
                className="flex justify-between items-center text-sm"
              >
                <span>
                  {order.dishname} x{order.quantity}
                </span>
                <span>₹{order.price * order.quantity}</span>
                {/* Minus Button */}
                <button
                  onClick={() => removeDish(order.index)}
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Subtotal */}
            <div className="mt-2 flex justify-between items-center font-semibold">
              <span>Subtotal:</span>
              <span>
                ₹
                {orders.reduce(
                  (acc, order) => acc + order.price * order.quantity,
                  0
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Stickyfooter />
    </div>
  );
};

export default Dishlist;
