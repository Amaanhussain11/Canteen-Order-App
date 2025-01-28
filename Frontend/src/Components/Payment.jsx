import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { GlobalContextprice } from "../Context/Contextvarprice";
const PaymentGateway = () => {
  const [pricelist] = useContext(GlobalContextprice);
  const Total = pricelist.reduce((sum, num) => sum + num, 0);
  
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    hostel: "",
  });
  const navigate = useNavigate();

  // Loading the razorpay script dynamically

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Payment

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert(
        "Failed to load Razorpay SDK. Please check your internet connection."
      );
      return;
    }

    // Fetch order details from your backend
    const response = await fetch("http://localhost:5555/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Total, currency: "INR" }),

    });
    // console.log(Total)
    const { order } = await response.json();

    // Configure Razorpay options
    const options = {
      key: "rzp_test_FbxBFpiP1z9ONm", // Replace with your Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Canteen Order App",
      description: "Payment for order",
      order_id: order.id,
      handler: async function (response) {
        const verifyResponse = await fetch(
          "http://localhost:5555/payment/verify-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );
        const verifyResult = await verifyResponse.json();
        if (verifyResult.success) {
          alert("Payment Successful!");
        } else {
          alert("Payment verification failed!");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      location === "hostel" &&
      (!formData.name || !formData.phone || !formData.hostel)
    ) {
      alert("Please fill out all the fields for hostel delivery.");
      return;
    }

    // Proceed to payment
    alert("Redirecting to payment...");
    // Add payment gateway logic here
  };

  return (
    <div className=" min-h-screen bg-[#FFF4E6] flex flex-col items-center justify-center">
      <header className="absolute top-0 w-full bg-[#DB8F4D] flex items-center px-4 shadow-lg h-[80px] justify-end">
        <Link to="/" className="ml-20">
          <GoHomeFill fontSize={30} />
        </Link>
      </header>
      <h1 className="text-2xl font-bold mb-6 text-[#3E2723]">
        Payment Gateway
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md">
        <p className="mb-4 font-semibold text-[#3E2723]">
          Are you in the canteen or the hostel?
        </p>
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 rounded-xl ${
              location === "canteen" ? "bg-[#7DCEA0] text-white" : "bg-gray-200"
            }`}
            onClick={() => setLocation("canteen")}
          >
            Canteen
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${
              location === "hostel" ? "bg-[#7DCEA0] text-white" : "bg-gray-200"
            }`}
            onClick={() => setLocation("hostel")}
          >
            Hostel
          </button>
        </div>

        {location === "hostel" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#3E2723]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-[#3E2723]"
              >
                Phone No.
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="hostel"
                className="block text-sm font-semibold text-[#3E2723]"
              >
                Hostel No.
              </label>
              <input
                type="text"
                id="hostel"
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your hostel Number"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7DCEA0] text-white py-2 rounded-xl font-bold"
              onClick={handlePayment}
            >
              Proceed to Pay
            </button>
          </form>
        )}

        {location === "canteen" && (
          <button
            onClick={handlePayment}
            className="w-full bg-[#7DCEA0] text-white py-2 rounded-xl font-bold mt-4"
          >
            Proceed to Pay
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;
