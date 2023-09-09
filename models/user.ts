import { Schema, model, models } from "mongoose";

export const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is Required"],
  },
});

const User = models.User || model("User", userSchema);

export default User;
