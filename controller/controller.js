const httpStatus = require("http-status");
const User = require("../models/usermodal");
const { hashPassword } = require("../models/userPassword");
const httpstatus = require("http-status");
const Joi = require("joi");

// get all data
const getMongodbUser = async (request, res) => {
  try {
    const users = await User.getAllData();
    if (!users || users.length === 0) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({
          statusecode: `${httpStatus.NOT_FOUND}`,
          error: "user not found",
        });
    } else {
      res.send(users);
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,
        error: "internal server error",
      });
  }
};

const validator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    password_Conform: Joi.string().valid().required(),
    tc: Joi.boolean().valid(true).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      statuscode: httpStatus.BAD_REQUEST,
      message: error.details[0].message,
    });
  }
  next();
};
// create  data
const postAllData = async (req, res) => {
  try {
    const { name, email, password, password_Conform, tc } = req.body;
    const user = await User.getEmailbyId(email);
    if (user) {
      return res
        .status(httpStatus.CONFLICT)
        .json({
          statusecode: `${httpStatus.CONFLICT}`,
          message: "Email alrady exitist",
        });
    }
    if (password !== password_Conform) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          statusecode: `${httpStatus.NOT_FOUND}`,
          message: "password and confom password doesnt match",
        });
    }
    const hashedPassword = await hashPassword(password);
    const saveuser = await User.postAllData(name, email, hashedPassword, tc);
    const usersave = await User.getEmailbyId(email);
    const token = User.tokengeneret(usersave);
    res
      .status(httpStatus.OK)
      .json({
        statusecode: `${httpStatus.OK}`,
        message: "successfully registered",
        saveuser: saveuser,
        token: token,
      });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,
        error: "Unable to register",
      });
  }
};

// get find by id
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.userId);
    console.log(user);
    res
      .status(httpStatus.OK)
      .json({
        statusecode: `${httpStatus.OK}`,
        message: "find user by id",
        user,
      });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,
        error: "internal server error",
      });
  }
};

// update user by id with password hashing
const updateUserId = async (req, res) => {
  try {
    const { password } = req.body;
    if (password) {
      const updatepass = await hashPassword(password);
      req.body.password = updatepass;
    }
    const updateuser = await User.updateUserId(req.params.userId, req.body);
    res
      .status(httpStatus.OK)
      .json({
        statusecode: `${httpStatus.OK}`,
        message: "update user successfull",
        updateuser,
      });
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,
        error: "internal server error",
      });
  }
};

// delete userby id
const deleteUserbyId = async (req, res) => {
  try {
    const user = await User.deleteUserbyId(req.params.userId);
    if (user) {
      res
        .status(httpStatus.OK)
        .json({
          statusecode: `${httpStatus.OK}`,
          message: "delete succcessfull",
          user,
        });
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .json({
          statusecode: `${httpStatus.NOT_FOUND}`,
          error: "user not found",
        });
    }
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,
        error: "internal server error",
      });
  }
};

module.exports = {
  getMongodbUser,
  postAllData,
  getUserById,
  updateUserId,
  deleteUserbyId,
  validator,
};
