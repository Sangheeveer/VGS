const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const crypto=require('crypto');



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Required Field']
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
          ],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:7,

    },
    phoneno:{
        type:String,
        required:[true,"PhoneNo is required"],
        unique:true,
        match: [
            /^[4-9][0-9]{9}$/,
            "Please add a valid PhoneNo",
          ],        
    },
    resetPasswordToken:{
        type:String
    },
    expirepasswordToken:Date,
    passwordChangedAt:Date,   
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    }
    },
    { timestamps: true }
);
    
userSchema.methods.matchPassword = async function (enteredPassword) {
      return await bcrypt.compare(enteredPassword, this.password);
    };
    
userSchema.pre("save", async function (next) {
      if (!this.isModified("password")) {
        return next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      // Set passwordChangedAt to the current time
        this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure the timestamp is before the JWT is created
        next();
    });

    
userSchema.methods.createResetToken=function(){
     const resetToken=crypto.randomBytes(16).toString('hex');
     this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
     this.expirepasswordToken=Date.now()+10*60*1000;

     return resetToken;
}

userSchema.methods.isPasswordChanged=function(jwtTimeStamp){
    if(this.passwordChangedAt){
        const psdTimeStamp= parseInt(this.passwordChangedAt.getTime()/1000,10)
        return jwtTimeStamp<psdTimeStamp;
    }
    return false;
}

const User = mongoose.model("User", userSchema);
module.exports=User;   

