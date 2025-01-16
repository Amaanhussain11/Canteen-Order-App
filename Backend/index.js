import express from "express";
import mongoose from "mongoose";
import { createServer } from "http"; // Import createServer for HTTP server
import { Server } from "socket.io"; // Import Socket.io
import { PORT, dburl } from "./config.js";
import Dishroutes from "./Routes/Dishroutes.js";
import Adminroutes from "./Routes/Adminroutes.js";
import Roomroutes from "./Routes/Roomroutes.js";
import cors from "cors";

const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins, // Update with your client origin if needed
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(dburl)
  .then(() => {
    console.log("Connected to the database");
    httpServer.listen(PORT, () => {
      // console.log(`Server is working on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Everything working well");
});

app.use("/Dishes", Dishroutes);
app.use("/Admin", Adminroutes);
app.use("/Room", Roomroutes);

// Socket.io setup
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    socket.to(roomId).emit("userJoined", `User ${socket.id} joined the room`);
  });

  // Add a dish to the order list
  socket.on("addDish", (roomId, dish) => {
    console.log(`Dish added to room ${roomId}:`, dish);
    io.to(roomId).emit("updateOrderList", dish); // Broadcast to all in room
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
