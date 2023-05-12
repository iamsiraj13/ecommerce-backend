const adminModel = require("../models/AdminSchema");
const { createToken } = require("../utils/createToken");
const { responseReturn } = require("../utils/response");
const bycript = require("bcrypt");

class authController {
  //=============== admin login controller  ==============

  adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel
        .findOne({ email: email })
        .select("+password");
      if (admin) {
        const match = await bycript.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          });

          responseReturn(res, 200, { token, message: "Login Successfull" });
        } else {
          responseReturn(res, 404, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found!" });
      }
    } catch (error) {
      responseReturn(res, 500, error.message);
    }
  };

  //================= get user  ================

  getUser = async (req, res) => {
    const { role, id } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 404, { userInfo: user });
      } else {
        console.log("seller information");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new authController();
