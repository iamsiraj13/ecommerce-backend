const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors");
const router = require("./routes/authRoute.js");
const cookieParser = require("cookie-parser");
const app = express();
//configure env
dotenv.config();

//middelwares
app.use(
  cors({
    origin: "http://localhost:5173",
    withCredendialts: true,
  })
);
app.use(cookieParser());
app.use(express.json());

//rest api
app.use("/api", router);

app.get("/", async (req, res) => {
  res.send("Hello world");
});
//PORT
const PORT = process.env.PORT || 8080;
//databse config
connectDB();
//run listen
app.listen(PORT, () => {
  console.log(`Server Running o  mode on port  `);
});
