const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log("hit 2");
  if (!token) {
    return res.status(404).json({ msg: "No Authorized" });
  }
  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtSECRET")
    );
    req.user = decoded.user;
    console.log("hit 3");
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Invalid Token" });
  }
};
