const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  image: {
    type: String,
    default: "admin.png",
  },
  role: {
    type: String,
    default: "admin",
  },
});

const adminModel = mongoose.model("admins", AdminSchema);
module.exports = adminModel;
