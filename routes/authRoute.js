const express = require("express");
const { adminLogin } = require("../controllers/authController");

//router object
const router = express.Router();

//routing
router.post("/admin-login", adminLogin);

module.exports = router;
