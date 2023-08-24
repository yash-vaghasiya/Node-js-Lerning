const httpStatus = require("http-status");
const {comparepassword} = require("../models/userPassword");
const User = require("../models/usermodal");

const loginUser = async function(req, res) {
   try{
    const {email, password} = req.body;
    const user = await User.loginUser(email);
    if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({statusecode: `${httpStatus.NOT_FOUND}`, error: 'User not found' });
      }
      const passwordMatch = await comparepassword(password, user.password);

    if (!passwordMatch) {
      return res.status( httpStatus.UNAUTHORIZED).json({ statusecode: `${httpStatus.UNAUTHORIZED}`,error: 'Incorrect password' });
    }
    return res.status(httpStatus.OK).json({statusecode: `${httpStatus.OK}`, message: 'Login successful', user});
  }catch(error){
    console.log(error)
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({statusecode: `${httpstatus.INTERNAL_SERVER_ERROR}`,error: "internal server error"});
  }
}; 
module.exports = {
    loginUser,
  }
