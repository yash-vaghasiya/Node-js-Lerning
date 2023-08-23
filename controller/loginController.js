const {comparepassword} = require("../models/userPassword");
const User = require("../models/usermodal");

const loginUser = async function(req, res) {
   try{
    const {email, password} = req.body;
    const user = await User.loginUser(email);
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      const passwordMatch = await comparepassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    return res.status(200).json({ message: 'Login successful', user});
  }catch(error){
    console.log(error)
    res.status(500).json({error: "login faild"});
  }
};
  
module.exports = {
    loginUser,
  }

  