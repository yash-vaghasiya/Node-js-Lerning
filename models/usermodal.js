const User = require('./userschema');


const getAllData = function(){
    const get = User.find({});
    return get;
}
const postAllData = async function(name, email, age, mobileNo){
    const  postss = new User({name, email, age, mobileNo});
    return postss.save();
    // console.log();
}
const getUserById = async function(userId) {
    console.log(userId);
    const user =  User.findById(userId);
    return user;
};

module.exports ={
    getAllData,
    postAllData,
    getUserById,
}
