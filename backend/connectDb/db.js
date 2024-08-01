const  mongoose=require("mongoose");

const connectDB = async () => {
    mongoose.connect('mongodb://localhost:27017/VGS',{
        useNewUrlParser:true
    }).then(()=>{console.log('DB connection is successful')});
};

module.exports=connectDB;