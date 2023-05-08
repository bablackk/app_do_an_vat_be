const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    road: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "customer",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
