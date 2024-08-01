const jwt=require('jsonwebtoken');

const CreateToken= (res,Id) =>{
   console.log(Id,"createtoken")
   console.log(process.env.jwt_token_expire,"hi")
 const token=jwt.sign({Id},process.env.security_Token,{
    expiresIn:process.env.jwt_token_expire,
 });
 console.log(token,"createtoken")
 res.cookie("jwt", token, {
   httpOnly: true,
   //  secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
    maxAge: 3 * 60 * 60 * 1000,
  });
};

module.exports=CreateToken;