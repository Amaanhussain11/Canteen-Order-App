import express from "express";
import { Admin } from "../Models/AdminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const jwtsecret = process.env.JWT_SECRET;

const router = express.Router();

// Admin login (http://localhost:5555/Admin/login)
router.post("/login", async (req, res) => {
  const { adminEmail, password } = req.body;

  try {
    const admin = await Admin.findOne({ adminEmail });
    console.log(adminEmail);

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      admin: { id: admin._id, email: admin.adminEmail },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Admin registration (http://loclahost:5555/Admin/register)
router.post("/register", async (req, res) => {
  const { adminEmail, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ adminEmail, password });
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Middleware to verify tokenl
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Access Denied" });

  const bearerToken = token.split(" ")[1]; // Extract token after "Bearer "
  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });

    req.user = decoded; // Add user data to request object
    next();
  });
};

// Middleware to check admin role
// const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admins only!" });
//   }
//   next();
// };

// Protected Admin Route
router.get("/adminpanel", verifyToken, (req, res) => {
  res.json({ message: "Welcome to Admin Panel" });
});

export default router;
