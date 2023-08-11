const mysqlConnection = require("../config/mysql");
const connectToDb = require("../config/mongodb");
const User = require("../models/userModel");

const getMysqlUser =  (req, res) => {
  mysqlConnection.query("SELECT * FROM perents", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getMongodbUser = async (request, response) => {
  try {
    const users = await User.find({});
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
};

connectToDb;
module.exports = {
    getMysqlUser,
    getMongodbUser,
};
