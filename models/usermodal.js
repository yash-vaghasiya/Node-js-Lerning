const User = require('./userschema');


// get all user
const getAllData = function(){
    const get = User.find({});
    return get;
}

// create new user
const postAllData = async function(name, email, age, password){
    const  postss = new User({name, email, age, password});
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
module.exports ={
    getAllData,
    postAllData,
    getUserById,
    updateUserId,
    deleteUserbyId,
    loginUser,
}
