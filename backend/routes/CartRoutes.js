const express=require('express');
const routing=express.Router();
const {saveCart,createCart,addCartitems,getCart}=require('./../controller/CartController.js')
const {protect}=require('./../middleware/authHandler.js');


routing.post('/additems',protect,addCartitems);
routing.get('/getitems/:id',protect,getCart);
// routing.delete('/:id', deleteCategory);

module.exports = routing;