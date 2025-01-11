import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateDish = () => {
  const { id } = useParams(); // Extract the dish ID from the URL
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // checking if its admin or not

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    // Check if the token exists
    if (!authToken) {
      alert("Unauthorized access. Redirecting to the landing page.");
      navigate("/"); // Redirect to the landing page
    }
  }, [navigate]);

  // Fetch the existing dish details on load
  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/Dishes/${id}`);
        const dish = response.data;
        setDishName(dish.name);
        setPrice(dish.price);
        setCategory(dish.type);
        // console.log(Category)
      } catch (error) {
        console.error("Error fetching dish details:", error);
        setMessage("Failed to load dish details. Please try again.");
      }
    };

    fetchDish();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDish = {
      name: dishName,
      price: Number(price),
      type: Category,
    };

    try {
      await axios.put(`http://localhost:5555/Dishes/${id}`, updatedDish);
      setMessage("Dish updated successfully!");
      setTimeout(() => navigate("/adminpanel"), 1500); // Redirect to admin panel
    } catch (error) {
      console.error("Error updating dish:", error);
      setMessage("Failed to update the dish. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update Dish</h2>
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
            <label htmlFor="category" className="block text-sm font-medium">
              type
            </label>
            <select
              id="category"
              value={Category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-600"
          >
            Update Dish
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDish;
