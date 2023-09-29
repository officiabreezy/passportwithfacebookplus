const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const jwtSign = (payload) => {
    return jwt.sign(payload, JWT_SECRET,{
    expiresIn: process.env.expiresIn|| '2d',
   });
};


const jwtVerify = (token) => {
 try {
    return jwt.verify(token, JWT_SECRET);
 } catch (error) {
   return false;
 }
};


const isAuthenticated = (req, res, next) => {
    try {
       const token = req.headers.authorization.split(" ")[1];
       if(!token) return res.status(401).json({message:"invalid token"});
       
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if(!decoded) return res.status(401).json({message: "authentication failed"});
       req.user = decoded;
       next();
      
    } catch (error) {
          
        return res.status(401).json({message:"authentication failed:XXXX" });
    }
};


module.exports = {jwtSign, jwtVerify, isAuthenticated};