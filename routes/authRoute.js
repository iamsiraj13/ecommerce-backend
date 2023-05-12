const express = require("express");
const { adminLogin, getUser } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing
router.post("/admin-login", adminLogin);
router.get("/get-user", authMiddleware, getUser);

module.exports = router;
