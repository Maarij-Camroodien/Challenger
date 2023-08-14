const {sign, verify} = require ('jsonwebtokem')
require('dotenv').config()
function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPass: user.userPass
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    }
    )
}

module.exports = {
    createToken
}

// function verifyAToken(req, res, next){
//     const token = req.headrs["authorization"].
// }