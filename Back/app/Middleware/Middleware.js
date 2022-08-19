const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtVerify = (req, res, next)=>{
    try {
        
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        if (!token){
            return res.status(401).json({
                error: "Pas de token dans la requête Delete User"
            })
        }
        jwt.verify(token, process.env.accessTokenSecret)
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            error: "token invalide"
        })
    }    
    next();
}

module.exports = jwtVerify;