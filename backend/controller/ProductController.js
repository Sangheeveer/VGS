const CustomError=require('./../middleware/CustomError.js');
const ErrorHandler= require('./../middleware/ErrorHandler.js');
const AsyncErrorHandler=require('./../middleware/AsyncErrorHandler');
const Product = require('./../models/ProductModel');
const Category = require('./../models/CategoryModel');


const getAllProduct=AsyncErrorHandler(async(req,res,next)=>{

    const products=await Product.find();

    if(!products){
      return next(new CustomError('Internal server error',500));
    }


    res.status(201).json({
        status: 201,
        data: {
            products
        }
    });
});

const getProductByCategory=AsyncErrorHandler(async(req,res,next)=>{
    const categoryId=req.params.categoryId;
    console.log(categoryId);
    const products=await Product.find({category:categoryId});
     console.log("getproduct")
    if(!products){
      return next(new CustomError('Internal server error',500));
    }


    res.status(201).json({
        status: 201,
        data: {
            products
        }
    });
});

const getOneProduct=AsyncErrorHandler(async(req,res,next)=>{
    const id=req.params.id;
    const products=await Product.findOne({_id:id});

    if(!products){
      return next(new CustomError('Product not found',500));
    }


    res.status(201).json({
        status: 201,
        data: {
            products
        }
    });
});

const addProduct=AsyncErrorHandler(async(req,res,next)=>{
    // const id=req.params.id
    const {user,name,unit,stock,price,description,brand,category}=req.body;

    const categoryId=await Category.findOne({_id:category});

    if(!categoryId){
      return next(new CustomError('Category does not Exists!',400));
    }

    const newProduct=await Product.create({
        user, name, unit,stock,category,price,description,brand
    });
     console.log(newProduct,"newproduct")

    if (!newProduct) {
        return next(new CustomError('Failed to create product!', 400));
    }

    res.status(201).json({
        status: 201,
        data: {
            newProduct
        }
    });
});

const updateProduct=AsyncErrorHandler(async(req,res,next)=>{
    const id = req.params.id;
    const { name, unit, stock, price, description, brand } = req.body;

    // Update the product by id and return the updated document
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        { name, unit, stock, price, description, brand },
        { new: true, runValidators: true }
    );

    // If the product does not exist, return an error
    if (!updatedProduct) {
        return next(new CustomError('Product does not exist!', 400));
    }

    // Send back the updated product
    res.status(200).json({
        status: 200,
        data: {
            message:"product updated successfully..."
        }
    });
});


const deleteProduct=AsyncErrorHandler(async(req,res,next)=>{
    const id=req.params.id;

    const deletePro=await Product.findOne({_id:id});

    if(!deletePro){
      return next(new CustomError('Product doest not  exists!',400));
    }

    await Product.deleteOne({_id:id});

    res.status(201).json({
        status:201,
        data:{
            message:"product deleted successfully..."
        }
    });
});


module.exports={updateProduct,getProductByCategory,getAllProduct,deleteProduct,addProduct,getOneProduct};