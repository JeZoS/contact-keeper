const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const {
  check,
  validationResult,
} = require("express-validator");
const { findByIdAndUpdate } = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post(
  "/",
  [
    auth,
    [check("name", "Name is Required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array() });
    }
    const { name, email, type, phone } = req.body;
    try {
      const newC = new Contact({
        name,
        email,
        type,
        phone,
        user: req.user.id,
      });
      const contact = await newC.save();
      res.json(contact);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const { name, email, type, phone } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (type) contactFields.type = type;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ msg: "Contact not found" });
    if (contact.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ msg: "Contact not found" });
    if (contact.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndDelete(req.param.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
