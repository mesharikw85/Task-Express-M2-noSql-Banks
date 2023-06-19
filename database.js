const dotEnv = require("dotenv");
dotEnv.config();
const mongoose = require("mongoose");

const dataDb = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("database connected established");
  } catch (error) {
    console.log("database connected is not established");
  }
};

module.exports = dataDb;
