const jwt=require('jsonwebtoken');
const User=require('./../models/Usersmodel');
const CustomError = require('./CustomError');
// const security_Token=process.env.security_Token;
const protect=async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
          return next(new CustomError('You are not logged in', 401));
        }
    
        const decode = jwt.verify(token, process.env.security_Token);
    
        const user = await User.findById(decode.Id).select('-password');
        if (!user) {
          return next(new CustomError('User with given token does not exist', 401));
        }
    
        const changed = await user.isPasswordChanged(decode.iat);
        if (changed) {
          return next(new CustomError('Password changed recently. Please login again', 401));
        }
    
        req.user = user;
        next();
      } catch (error) {
        // Directly pass the error to the custom error handler
        next(error);
      }
}
const admin=async(req,res,next)=>{
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new CustomError("Not authorized as admin!", 401));
  }
};
module.exports={protect,admin};