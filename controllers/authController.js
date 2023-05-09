const adminModel = require("../models/AdminSchema");
const { createToken } = require("../utils/createToken");
const { responseReturn } = require("../utils/response");
const bycript = require("bcrypt");

class authController {
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
}

module.exports = new authController();
