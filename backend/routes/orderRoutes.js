const express=require('express');
const routing=express.Router();

const {protect,admin}=require('./../middleware/authHandler.js');
const {addOrder}=require('./../controller/orderController.js');

routing.post('/addorder',protect,addOrder);
// routing.get('/allcategory',getAllCategory)
// routing.delete('/deletecategory/:id',protect,admin, deleteCategory);
// routing.put('/editcategory/:id',protect,admin,editCategory);

module.exports = routing;