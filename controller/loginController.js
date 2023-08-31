const httpStatus = require("http-status");
const { comparepassword } = require("../models/userPassword");
const User = require("../models/usermodal");
const Joi = require("joi");

const validator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
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

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.loginUser(email);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusecode: `${httpStatus.NOT_FOUND}`,
        error: "User not found",
      });
    }
    const passwordMatch = await comparepassword(password, user.password);

    if (!passwordMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusecode: `${httpStatus.UNAUTHORIZED}`,
        error: "Incorrect password",
      });
    }
    const usersave = await User.getEmailbyId(email);
    const token = User.tokengeneret(usersave);
    return res.status(httpStatus.OK).json({
      statusecode: `${httpStatus.OK}`,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      statusecode: `${httpStatus.INTERNAL_SERVER_ERROR}`,
      error: "internal server error",
    });
  }
};

const logeduser = async (req, res) => {
  res.send({ user: req.user });
};
module.exports = {
  loginUser,
  validator,
  logeduser,
};
