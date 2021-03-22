const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoUri");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected....");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
