import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  users: [{ type: String }], // List of user IDs or names
  orderList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }], // Dish references
  createdAt: { type: Date, default: Date.now }
});

export const Room = mongoose.model('Room', roomSchema);
