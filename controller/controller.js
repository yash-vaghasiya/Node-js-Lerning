const mysqlConnection = require("../config/mysql");
const connectToDb = require("../config/mongodb");
const User = require("../models/userModel");

const getMysqlUser =  (req, res) => {
  mysqlConnection.query("SELECT * FROM perents", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const postmysqlUser = (req, res) => {
  const { id, name, email, age, mobileNo } = req.body;

  const query = 'INSERT INTO perents (id,name, email, age, mobileNo) VALUES (?, ?, ?, ?, ?)';
  const values = [id,name, email, age, mobileNo];

  mysqlConnection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error inserting into MySQL database" });
    } else {
      res.status(201).json({ message: "Data successfully inserted" });
    }
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
const postMongodbUser = async (req, res) => {
  try {
    const { name, email,age,mobileNo } = req.body;
    const newUser = new User({ name, email, age, mobileNo });
    const saveuser = await newUser.save();
    res.status(201).json(saveuser);
  } catch (error) {
    res.status(500).json({ error: "Error creating MongoDB user" });
  }
};

const edituser = async (req, res) => {
   try {
     const { userId } = req.params;
     console.log("UserID:", userId); // Add this line for debugging
     const user = await User.findById(userId);
     console.log("User:", user); // Add this line for debugging
     
     if (!user) {
       return res.status(404).json({ error: "User not found" });
     }
     res.json(user);
   } catch (error) {
     console.error(error); // Log the error for debugging
     res.status(500).json({ error: "Error finding user in MongoDB" });
   }
};


connectToDb;
module.exports = {
    getMysqlUser,
    getMongodbUser,
    postMongodbUser,
    postmysqlUser,
    edituser,
};
