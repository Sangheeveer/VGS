const express=require('express');
const routing=express.Router();
const {protect}=require('./../middleware/authHandler.js');
const {addAddress,getAddress,deleteAddress,editAddress}=require('./../controller/addressController.js');


routing.get('/getaddress/:userId',protect,getAddress);
routing.post('/addaddress/:userId',protect,addAddress);
routing.delete('/deleteaddress/:userId/:id',protect,deleteAddress);
// routing.get('/getoneproduct/:id',getOneProduct);
// routing.get('/:categoryId',getProductByCategory);
routing.put('/editaddress/:userId/:id',protect,editAddress);

module.exports = routing;