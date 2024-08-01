const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:[true,'Category required']
    }
},
{ timestamps: true }
);

const  category= mongoose.model("category", CategorySchema);
module.exports=category;   