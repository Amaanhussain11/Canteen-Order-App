import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [type, settype] = useState("Veg");
  const [imageLink, setimageLink] = useState("");
  const [message, setMessage] = useState("");

  // checking if its admin or not

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // Check if the token exists
    if (!authToken) {
      alert("Unauthorized access. Redirecting to the landing page.");
      navigate("/"); // Redirect to the landing page
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDish = {
      name: dishName,
      price: Number(price),
      type: type,
      imageLink: imageLink,
    };

    try {
      const response = await axios.post(
        "http://localhost:5555/Dishes",
        newDish
        // console.log("hello")
      );
      setMessage("Dish created successfully!");
      console.log(response.data);
      // Clear the form
      setDishName("");
      setPrice("");
      settype("Veg");
    } catch (error) {
      console.error("Error creating dish:", error);
      setMessage("Failed to create the dish. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add a New Dish</h2>
        {message && <p className="text-sm mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dish Name */}
          <div>
            <label htmlFor="dishName" className="block text-sm font-medium">
              Dish Name
            </label>
            <input
              type="text"
              id="dishName"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the dish name"
              required
            />
          </div>
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the price"
              required
              min="0"
            />
          </div>
          {/* type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium">
              type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => settype(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div>
            <label htmlFor="imageLink" className="block text-sm font-medium">
              Image Link
            </label>
            <input
              type="text"
              id="imageLink"
              value={imageLink}
              onChange={(e) => setimageLink(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the dish image link"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-600"
          >
            Add Dish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
