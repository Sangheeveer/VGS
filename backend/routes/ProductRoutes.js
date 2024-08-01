const express=require('express');
const routing=express.Router();
const {protect,admin}=require('./../middleware/authHandler.js');
const {updateProduct,getProductByCategory,getAllProduct,deleteProduct,addProduct,getOneProduct}=require('./../controller/ProductController.js');

routing.get('/', getAllProduct);
routing.post('/addproduct',protect,admin,addProduct);
routing.delete('/deleteproduct/:id',protect,admin,deleteProduct);
routing.get('/getoneproduct/:id',getOneProduct);
routing.get('/:categoryId',protect,admin,getProductByCategory);
routing.put('/updateproduct/:id',protect,admin,updateProduct);

module.exports = routing;