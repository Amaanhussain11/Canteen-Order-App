import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const adminSchema = new mongoose.Schema({
  adminEmail: {
    type: String,
    required: true, 
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);

