const CustomError=require('./../middleware/CustomError.js');
const ErrorHandler= require('./../middleware/ErrorHandler.js');
const AsyncErrorHandler=require('./../middleware/AsyncErrorHandler');
const category = require('./../models/CategoryModel');


const createCategory=AsyncErrorHandler(async(req,res,next)=>{
    const {categoryName}=req.body;

    const categorycreate = await category.findOne({ categoryName: { $regex: new RegExp(categoryName, 'i') } });


    if(categorycreate){
        return next(new CustomError('Category already Exists!',400));
    }

    const createCa=await category.create({categoryName});

    if(!createCa){
        return next(new CustomError('Invalid category data!',400));
    }

    res.status(201).json({
        status:201,
        data:{
            createCa
        }
    });
});

const getAllCategory=AsyncErrorHandler(async(req,res,next)=>{

    const categories=await category.find();

    if(!categories){
      return next(new CustomError('Internal Server Error!',500));
    }

    res.status(201).json({
        status:201,
        data:{
            categories
        }
    });
});

const editCategory=AsyncErrorHandler(async(req,res,next)=>{
    const id=req.params.id;
    const {newData}=req.body;
    const categories=await category.findOne({_id:id});

    if(!categories){
      return next(new CustomError('Category does not exists',400));
    }

    const updatedCategory = await category.findOneAndUpdate(
        { _id: id }, 
        { categoryName: newData}, 
        { new: true, runValidators: true } 
      );

    res.status(201).json({
        status:201,
        data:{
            message:"category updated successfully..."
        }
    });
});

const deleteCategory=AsyncErrorHandler(async(req,res,next)=>{
    const id=req.params.id;
    console.log("xc")
    const deletecategory=await category.findOne({_id:id});
    console.log("delete") 
    if(!deletecategory){
      return next(new CustomError('Category doest not  exists!',400));
    }

    await category.deleteOne({_id:id});

    res.status(201).json({
        status:201,
        data:{
            message:"category deleted successfully..."
        }
    });
});


module.exports={editCategory,createCategory,deleteCategory,getAllCategory};