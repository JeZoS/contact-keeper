const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  check,
  validationResult,
} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/",
  [
    check("name", "Please add the name").not().isEmpty(),
    check(
      "email",
      "Please include a valid email"
    ).isEmail(),
    check("password", "Please enter a password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ msg: "User already exists" });
      }
      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      jwt.sign(
        { user: { id: user._id } },
        config.get("jwtSECRET"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          else res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
