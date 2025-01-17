import React, { useState, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UpdateDish from "./Updatedish";

const AdminPanel = () => {
  const [dishes, setDishes] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // checking if it's admin or not

  useEffect(() => {
    // e.preventDefault();
    const authToken = localStorage.getItem("authToken");

    // Check if the token exists
    if (!authToken) {
      alert("Unauthorized access. Redirecting to the landing page.");
      navigate("/"); // Redirect to the landing page
    }
  }, [navigate]);

  // Fetch dishes from the API
  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        "https://canteen-order-app-4.onrender.com/Dishes/category"
      );
      setDishes(response.data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      setMessage("Failed to load dishes. Please try again.");
    }
  };

  // Delete a dish by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://canteen-order-app-4.onrender.com/Dishes/${id}`
      );
      setMessage("Dish deleted successfully!");
      setDishes(dishes.filter((dish) => dish._id !== id)); // Remove deleted dish from the list
    } catch (error) {
      console.error("Error deleting dish:", error);
      setMessage("Failed to delete the dish. Please try again.");
    }
  };

  // Navigate to the update page
  const handleUpdate = (id) => {
    navigate(`/update-dish/${id}`);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-start ">
        <div className=" text-3xl font-bold mb-6">Admin Panel</div>
        <div className="flex justify-center items-center ">
          <Link to="/" className="">
            <GoHomeFill fontSize={35} />
          </Link>
        </div>
      </div>

      <button
        onClick={() => navigate("/adminpanel/addnewdish")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-5"
      >
        Add New Dish
      </button>

      {message && <p className="mb-4 text-sm">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            className="p-4 bg-white border rounded shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{dish.name}</h2>
              <p className="text-gray-600">Price: ₹{dish.price}</p>
              <p className="text-gray-600">Category: {dish.type}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleUpdate(dish._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(dish._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
