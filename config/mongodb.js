const mongoose = require("mongoose");
const { MONGO_SERVER, MONGO_DATABASE } = process.env;

mongoose
  .connect(`mongodb://127.0.0.1:27017/y-com`)
  .then(() => {
    console.log("Connecte to Mongodb");
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
