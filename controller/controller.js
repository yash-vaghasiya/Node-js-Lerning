const User = require("../models/usermodal");

const getMongodbUser = async (request, response) => {
  try {
    const users = await User.getAllData();
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
};
const postAllData = async (req, res) => {
  try {
    const { name, email,age,mobileNo } = req.body;
    const newUser = await User.postAllData(name, email, age, mobileNo);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating MongoDB user" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.userId);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error finding user in MongoDB" });
  }
};


// const updatedata = async (req, res) => {
//   try {
//     const schema = User.object({
//       title: User.string(2).number(2).required()
//     });

//     const validation = schema.validate(req.body);
//     if (validation.error) {
//       return res.status(400).json({ error: validation.error.details[0].message });
//     }

//     const userId = parseInt(req.params.id); // Assuming the ID is a number
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     user.title = req.body.title;
//     await user.save(); // Save the changes

//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error updating user data' });
//   }
// };

module.exports = {
    getMongodbUser,
    postAllData,
    getUserById,
    updatedata,
};
