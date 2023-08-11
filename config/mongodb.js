const mongoose = require("mongoose");
const { MONGO_SERVER, MONGO_DATABASE } = process.env;

mongoose
  .connect(`mongodb://${MONGO_SERVER}/${MONGO_DATABASE}`)
  .then(() => {
    console.log("Connecte to Mongodb");
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
