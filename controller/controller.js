const httpStatus = require("http-status");
const User = require("../models/usermodal");
const {hashPassword}  = require("../models/userPassword");
const httpstatus = require("http-status")

// get all data
const getMongodbUser = async (request, res) => {
  try {
    const users = await User.getAllData();
    if (!users || users.length === 0){
      return response.status(httpStatus.NOT_FOUND).json({statusecode: `${httpStatus.NOT_FOUND}`, error: "user not found"})
    }else{
      res.send(users);
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,error: "internal server error"});
  }
};

// create  data
const postAllData = async (req, res) => {
    const { name, email, password, password_Conform, tc } = req.body;
    const user = await User.getEmailbyId(email);
    if (user) {
      res.status(httpStatus.CONFLICT).json({statusecode: `${httpStatus.CONFLICT}`, message: "Email alrady exitist" });    
    }
    else {
      if (name && email && password && password_Conform && tc) {
        if (password === password_Conform) {
          try {
            const hashedPassword = await hashPassword(password);
            const saveuser = await User.postAllData(name, email, hashedPassword, tc);
            const usersave = await User.getEmailbyId(email);
            const token = User.tokengeneret(usersave)
            res.status(httpStatus.OK).json({statusecode:`${httpStatus.OK}`, message:"successfully registered", saveuser:saveuser, token:token})
          } catch (error) {
            console.log(error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,error:"Unable to register"});
          }
        } else {
          res.status(httpStatus.NOT_FOUND).json({statusecode: `${httpStatus.NOT_FOUND}`,message: "password and confom password doesnt match",});
        }
      } else {
        res.status(httpStatus.NOT_FOUND).json({statusecode: `${httpStatus.NOT_FOUND}`, message: "All Feild Required" });
      }
    }
};


// get find by id
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.userId);
    console.log(user);
    res.status(httpStatus.OK).json({statusecode: `${httpStatus.OK}`, message:"find user by id" ,user});
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,error: "internal server error"});
  }
};

// update user by id with password hashing
const updateUserId = async (req, res) => {
  try {
    const {password} = req.body
    if (password) {
      const updatepass = await hashPassword(password);
      req.body.password = updatepass;
    }
    const updateuser = await User.updateUserId(req.params.userId, req.body);
    res.status(httpStatus.OK).json({statusecode:`${httpStatus.OK}`,message: "update user successfull" ,updateuser});
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,error: "internal server error"});
  }
};

// delete userby id
const deleteUserbyId = async (req, res) => {
  try {
    const user = await User.deleteUserbyId(req.params.userId);
    if (user) {
      res.status(httpStatus.OK).json({statusecode: `${httpStatus.OK}`,message: "delete succcessfull" ,user});
    } else {
      res.status(httpStatus.NOT_FOUND).json({statusecode: `${httpStatus.NOT_FOUND}`, error:"user not found"});
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,error: "internal server error"});
  }
};

module.exports = {
    getMongodbUser,
    postAllData,
    getUserById,
    updateUserId,
    deleteUserbyId,
}