const User = require("../models/usermodal");
const hashPassword  = require("../models/userPassword");

// get all data
const getMongodbUser = async (request, response) => {
  try {
    const users = await User.getAllData();
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
};

// create  data
const postAllData = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.postAllData(name, email, age, hashedPassword);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating MongoDB user' });
  }
};


// get find by id
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.userId);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error finding user in MongoDB" });
  }
};

// update user by id with password hashing
const updateUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    // if (updateData.password) {
      // If password is provided, hash it
      // updateData.password = await bcrypt.hash(updateData.password, bcryptRounds);
    // }

    const updateuser = await User.updateUserId(userId, updateData);
    res.status(200).json(updateuser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user data' });
  }
};

// delete userby id
const deleteUserbyId = async (req, res) => {
  try {
    const user = await User.deleteUserbyId(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found.");
    }
  } catch (error) {
    res.status(500).json("Failed to delete user.");
  }
};

module.exports = {
    getMongodbUser,
    postAllData,
    getUserById,
    updateUserId,
    deleteUserbyId,
};

