import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://canteen-order-app-4.onrender.com/Admin/login",
        {
          method: "POST",
          body: JSON.stringify({ adminEmail: username, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in!",
        });
        navigate("/adminpanel");
      } else {
        setError("Invalid credentials");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="text-[#4E2327] flex items-center justify-center h-screen bg-[#FFF4E6]">
      <div className="mx-4 bg-[#FAD7A0] p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="absolute top-5 right-5 flex ">
          <Link to="/" className="ml-20">
            <GoHomeFill fontSize={30} />
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="">
          <div className="mb-4">
            <label className=" block text-[#4E2327] font-medium mb-2">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className=" bg-[#FFF4E6] w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E2327]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#4E2327] font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" bg-[#FFF4E6] w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E2327]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#3E2723] text-white font-medium py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
