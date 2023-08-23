const bcrypt = require('bcrypt');
const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS) ;

const hashPassword = async function(password){
    const hashedpassword = await bcrypt.hash(password, bcryptRounds)
    return hashedpassword;
}
const comparepassword = async function(password, hashedpassword){
    const match = await bcrypt.compare(password, hashedpassword)
    return match;
}
module.exports = {
    hashPassword, 
    comparepassword,
}
