// import mongoose from "mongoose";
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(
      "mongodb+srv://iamsiraj13:iamsiraj13@cluster0.4tdkj.mongodb.net/ecommerce"
    );
    console.log("Conneted To Mongodb Databse");
  } catch (error) {
    console.log(`Errro in Mongodb  `);
  }
};

module.exports = connectDB;
