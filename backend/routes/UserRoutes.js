const express=require('express');
const routing=express.Router();
const {logoutUser,registerUser,forgotPassword, resetpassword,loginUser}=require('./../controller/UserController')
const {protect}=require('./../middleware/authHandler');

routing.post('/userlogin', loginUser);
routing.post('/register', registerUser);
routing.post('/forgetpassword',protect,forgotPassword);
routing.put('/resetpassword/:token',protect,resetpassword);
routing.post('/logout',logoutUser);
module.exports = routing;
