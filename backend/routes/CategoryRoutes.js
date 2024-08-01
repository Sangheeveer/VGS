const express=require('express');
const routing=express.Router();
const {editCategory,createCategory,deleteCategory,getAllCategory}=require('./../controller/CategoryController.js')
const {protect,admin}=require('./../middleware/authHandler.js');

routing.post('/createcategory',protect,admin, createCategory);
routing.get('/allcategory',getAllCategory)
routing.delete('/deletecategory/:id',protect,admin, deleteCategory);
routing.put('/editcategory/:id',protect,admin,editCategory);

module.exports = routing;