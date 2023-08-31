const jwt = require("jsonwebtoken");
const usermodal = require("../models/usermodal");

const checkuserauth = async(req, res, next)=>{

    let token;
    const { authorization } = req.headers;
  
    if (authorization && authorization.startsWith('Bearer')) {
      try {
       token = authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
        console.log(userId); // Debug: Check if userId is correct
  
        // Fetch User by userId
        const user = await usermodal.getUserById(userId);
  
        if (user) {
          req.user = user; 
          console.log(req.user); 
          next();
        } else {
          res.status(401).send({ "status": "failed", "message": "User not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
      }
    }
  
    if (!token) {
      res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
    }
  };
  
  module.exports = {
    checkuserauth,
  }; 
