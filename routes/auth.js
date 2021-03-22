const express = require("express");
const router = express.Router();
const {
  check,
  validationResult,
} = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ erros: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Invalid creds" });
      } else {
        const isMatch = await bcrypt.compare(
          password,
          user.password
        );
        if (!isMatch) {
          return res
            .status(400)
            .json({ msg: "Invalid creds" });
        } else {
          jwt.sign(
            { user: { id: user._id } },
            config.get("jwtSECRET"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                throw err;
              } else {
                res.status(200).json({ token });
              }
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
