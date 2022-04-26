var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET ='azerty';
module.exports = {
    generateTokenForUser:function(userData){
        return jwt.sign({
            userId:userData.id,
            isAdmin:userData.isAdmin
        })

    } 
}