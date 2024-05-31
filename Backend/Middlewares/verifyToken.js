const jwt = require('jsonwebtoken')
require('dotenv').config();

function verifyToken(req,res,next){
    // get the bearer token from headers of req
    const bearerToken = req.headers.authorization;
    // if bearerToken is not available
    if(!bearerToken)
    {
        return res.send({message:"Unauthorized user, Plz login to continue"})
    }
    // extreaxt the token from bearer token
    const token = bearerToken.split(' ')[1];
    try{
        jwt.verify(token,process.env.SECRET_KEY)
    }
    catch(err)
    {
        next(err)
    }
}
module.exports = verifyToken;