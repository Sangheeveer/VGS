const bcrypt=require('bcrypt');
const CustomError=require('./../middleware/CustomError.js')
const ErrorHandler= require('./../middleware/ErrorHandler.js');
const AsyncErrorHandler=require('./../middleware/AsyncErrorHandler');
const User = require('./../models/Usersmodel');
const sendmail=require('./../utils/sentMail');
const crypto=require('crypto');
const CreateToken=require('./../utils/CreateToken');
const cart=require('./../models/CartModel.js');

const registerUser=AsyncErrorHandler(async(req,res,next)=>{
    const {name,email,password,phoneno}=req.body;

    const loginUser=await User.findOne({email});
    console.log(name);
    if(loginUser){
      next(new CustomError('User already Exists!',400));
    }

    const users = await User.create({name,email,password,phoneno});
     
    if(!users){
      next(new CustomError('Invalid user data!',400));
    }
    console.log("users")

    const Cart=new cart();
    Cart.user=users._id;
    const cartcreate=await Cart.save()
    
    if(!cartcreate){
      next(new CustomError('Error occured while creating cart!',400));
    }

    CreateToken(res,users._id)
    
    res.status(201).json({
        status:201,
        data:{
            users
        }
    })
});

const loginUser=AsyncErrorHandler(async(req,res,next)=>{
   const {email,password}=req.body;
   const user=await User.findOne({email});
   console.log(user,"inside login")
   if(!user){
    return next(new CustomError('User does not exits',404));
  }
  
  if(await user.matchPassword(password)){
    console.log("asd");
    CreateToken(res,user._id)
    console.log("hjhkh") 
    res.status(201).json({
        status:201,
        data:{
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        }
    })
  }
  else{
     console.log("qwe");
     return next(new CustomError('userName or emailId is does not match',404));
  }

})

const forgotPassword=AsyncErrorHandler(async(req,res,next)=>{
      const {email}=req.body;
      const user=await User.findOne({email});

      if(!user){
        return next(new CustomError('we could not find the user with given emailId',404));
      }

      const resetToken=user.createResetToken();

      await user.save({validateBeforeSave:false});

      const urlPath=`${req.protocol}://${req.get('host')}/vgs/user/resetpassword/${resetToken}`;
      const message=`We have recived password reset request. Please use below link to reset your password \n\n${resetToken}`;

      try{
        await sendmail({
          email:user.email,
          subject:'Password reset request',
          message:message
        });

          res.status(200).json({
            status:'success',
            message:'password reset link send to user mail'
          })
      }catch(err){
        user.resetPasswordToken=undefined;
        user.expirepasswordToken=undefined;
        user.save({validateBeforeSave:false});

        next(new CustomError('There is an error sending password reset address. Please try later',500));

      }
});

const resetpassword=AsyncErrorHandler(async(req,res,next)=>{
      const token=crypto.createHash('sha256').update(req.params.token).digest('hex');
      const user=await User.findOne({resetPasswordToken:token,expirepasswordToken:{$gt:Date.now()}});

      if(!user){
        next(new CustomError('Token is invalid or expired',400));
      }

      user.password=req.body.Password;
      user.resetPasswordToken=undefined;
      user.expirepasswordToken=undefined;
      user.passwordChangedAt=Date.now();
      await user.save();

      res.status(200).json({
        status:'success',
        message:'Password reset Successfully!' 
      })

})

const logoutUser=AsyncErrorHandler(async(req,res,next)=>{
  res.cookie("jwt","",{httpOnly:true,expires:new Date(0)});


  res.status(200).json({
    status:'success',
    message:'logout  Successfully!' 
  })

});

module.exports={
  registerUser,
  forgotPassword,
  resetpassword,
  loginUser,
  logoutUser,
};