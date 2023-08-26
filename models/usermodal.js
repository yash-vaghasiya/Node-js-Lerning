const User = require('./userschema');
const jwt = require("jsonwebtoken");


// get all user
const getAllData = function(){
    const get = User.find({});
    return get;
}

// create new user
const postAllData = async function(name, email, password, tc){
    const  postss = new User({name, email, password, tc});
    return postss.save();
    // console.log();
}

// get user by id
const getUserById = async function(userId) {
    console.log(userId);
    const user =  User.findById(userId);
    return user;
}

// update user by id
const updateUserId = async function(userId, newData){
    const updateuser  = await User.findByIdAndUpdate(userId, newData, { new: true });
    return updateuser;
};

// delete userby id
const deleteUserbyId = async function (userId) {
    const deleteUser = await User.findByIdAndDelete(userId);
    return deleteUser;
  };

  const loginUser = async function(email){
    const user =  User.findOne({ email });
    return user;
  }

  const getEmailbyId = async function(email){
    const user = User.findOne({email:email});
    return  user;
  }

  const tokengeneret = function(User){
    const token  =  jwt.sign({userId:User._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE});
    return token;
  } 
module.exports ={
    getAllData,
    postAllData,
    getUserById,
    updateUserId,
    deleteUserbyId,
    loginUser,
    getEmailbyId,
    tokengeneret,
}
