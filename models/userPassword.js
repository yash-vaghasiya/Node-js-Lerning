const bcrypt = require('bcrypt');
const bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS) ;

const password = async function(password){
    const hashedpassword = await bcrypt.hash(password, bcryptRounds)
    return hashedpassword;
}
module.exports = password
