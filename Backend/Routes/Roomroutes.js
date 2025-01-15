import express from "express";
import { Room } from "../Models/RoomModel.js";

const router = express.Router();

router.post("/create-room", async (req, res) => {
  try {
    const { roomId } = req.body;
    const newRoom = new Room({ roomId, users: [req.body.user], orderList: [] });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

router.get("/getrooms", async (req, res) => {
  try {
    const room = await Room.find();
    return res.status(200).json(room);
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

router.post("/join-room", async (req, res) => {
  const { roomId, user } = req.body;
  const room = await Room.findOne({ roomId });
  if (room) {
    room.users.push(user);
    await room.save();
    res.status(200).json(room);
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});

export default router;
