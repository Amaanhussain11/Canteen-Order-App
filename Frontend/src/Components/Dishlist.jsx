// import React, { useContext, useState } from "react";
// import { RiFileList3Fill } from "react-icons/ri";
// import { GlobalContextdish } from "../Context/Contextvardish";
// import { GlobalContextname } from "../Context/Contextvarname";
// import { GlobalContextprice } from "../Context/Contextvarprice";

// const Dishlist = () => {
//   // Creating the list of dishname,recipient and dishprice
//   const [namelist] = useContext(GlobalContextname);
//   const [dishlistarr] = useContext(GlobalContextdish);
//   const [pricelist] = useContext(GlobalContextprice);

//   // creating an object of arrays, so that we can
//   let nestedOrders = {};
//   namelist.forEach((name, index) => {
//     const dish = dishlistarr[index];
//     const price = pricelist[index];

//     // If the name key doesn't exist, initialize it as an empty array
//     if (!nestedOrders[name]) {
//       nestedOrders[name] = [];
//     }

//     // Check if the dish already exists for the user
//     const existingDish = nestedOrders[name].find(
//       (order) => order.dishname === dish && order.price === price
//     );

//     if (existingDish) {
//       // If it exists, increment the quantity
//       existingDish.quantity += 1;
//     } else {
//       // Otherwise, add a new entry with quantity = 1
//       nestedOrders[name].push({ dishname: dish, price: price, quantity: 1 });
//     }
//   });

//   // console.log(nestedOrders);

//   // Creating a total of the pricelist
//   const Total = pricelist.reduce((sum, num) => sum + num, 0);

//   return (
//     <>
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           marginTop: "20px",
//         }}
//         className="border"
//         border="2"
//         cellPadding="5"
//       >
//         <thead className="border-1">
//           <tr>
//             <th className="border">Name</th>
//             <th className="border">Dish Name</th>
//             <th className="border">Price</th>
//             <th className="border">Quantity</th>
//             <th className="">Total (Price x Quantity)</th>
//           </tr>
//         </thead>
//         <tbody className="border text-start">
//           {Object.entries(nestedOrders).map(([name, orders]) => {
//             let subTotal = 0;

//             return (
//               <React.Fragment key={name}>
//                 {/* User's orders */}
//                 {orders.map((order, index) => {
//                   const total = order.price * order.quantity;
//                   subTotal += total;

//                   return (
//                     <tr className="align-top" key={`${name}-${index}`}>
//                       {index === 0 && (
//                         <td
//                           rowSpan={orders.length + 1}
//                           style={{ fontWeight: "bold" }}
//                         >
//                           {name}
//                         </td>
//                       )}
//                       <td className="">{order.dishname}</td>
//                       <td className="">{order.price}</td>
//                       <td className="">{order.quantity}</td>
//                       <td className="">{total}</td>
//                     </tr>
//                   );
//                 })}
//                 {/* Subtotal row */}
//                 <tr>
//                   <td
//                     colSpan="4"
//                     style={{ textAlign: "right", fontWeight: "bold" }}
//                   >
//                     Subtotal for {name}:
//                   </td>
//                   <td style={{ fontWeight: "bold" }}>{subTotal}</td>
//                 </tr>
//               </React.Fragment>
//             );
//           })}
//         </tbody>
//       </table>
//       <span>Total: {Total}</span>
//     </>
//   );
// };

// export default Dishlist;







import React, { useContext } from "react";
import { GlobalContextdish } from "../Context/Contextvardish";
import { GlobalContextname } from "../Context/Contextvarname";
import { GlobalContextprice } from "../Context/Contextvarprice";

const Dishlist = () => {
  const [namelist] = useContext(GlobalContextname);
  const [dishlistarr] = useContext(GlobalContextdish);
  const [pricelist] = useContext(GlobalContextprice);

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
      nestedOrders[name].push({ dishname: dish, price: price, quantity: 1 });
    }
  });

  const Total = pricelist.reduce((sum, num) => sum + num, 0);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Dish Name</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Quantity</th>
            <th className="border px-4 py-2 text-left">
              Total (Price x Quantity)
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(nestedOrders).map(([name, orders]) => {
            let subTotal = 0;

            return (
              <React.Fragment key={name}>
                {orders.map((order, index) => {
                  const total = order.price * order.quantity;
                  subTotal += total;

                  return (
                    <tr key={`${name}-${index}`} className="hover:bg-gray-100">
                      {index === 0 && (
                        <td
                          rowSpan={orders.length + 1}
                          className="border px-4 py-2 font-semibold text-gray-800"
                        >
                          {name}
                        </td>
                      )}
                      <td className="border px-4 py-2">{order.dishname}</td>
                      <td className="border px-4 py-2">₹{order.price}</td>
                      <td className="border px-4 py-2">{order.quantity}</td>
                      <td className="border px-4 py-2">₹{total}</td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50 font-bold text-gray-800">
                  <td
                    colSpan="4"
                    className="border px-4 py-2 text-right font-medium"
                  >
                    Subtotal for {name}:
                  </td>
                  <td className="border px-4 py-2">₹{subTotal}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 text-right text-lg font-bold">
        Grand Total: <span className="text-blue-600">₹{Total}</span>
      </div>
    </div>
  );
};

export default Dishlist;
