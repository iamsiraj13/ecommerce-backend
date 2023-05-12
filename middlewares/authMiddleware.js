const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(409).json({ error: "Please login" });
  } else {
    try {
      const decodedToken = await jwt.verify(accessToken, "mrsiraj");
      req.role = decodedToken.role;
      req.id = decodedToken.id;
      next();
    } catch (error) {
      return res.status(409).json({ error: "Please Login" });
    }
  }
};
