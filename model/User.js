import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "" },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: "1234" },
    image: { type: String, required: true, default: "" },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
