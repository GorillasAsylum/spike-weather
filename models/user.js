import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  id: Number,
});

export const UserModel = mongoose.model("User", UserSchema);

export default { UserSchema, UserModel };
