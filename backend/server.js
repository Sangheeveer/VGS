const express=require('express');
const path = require('path');
const bodyparser=require('body-parser');
const UserRoutes=require('./routes/UserRoutes');
const CategoryRoutes=require('./routes/CategoryRoutes');
const ProductRoutes=require('./routes/ProductRoutes');
const CartRoutes=require('./routes/CartRoutes');
const UploadRoutes=require('./routes/UploadRoutes');
const addressRoutes=require('./routes/addressRoutes');
const orderRoutes=require('./routes/orderRoutes');
const cors= require('cors');
const CustomError = require('./middleware/CustomError');
const cookieparser=require('cookie-parser');
const ErrorHandler= require('./middleware/ErrorHandler');
const connectDB=require('./connectDb/db');
const { request } = require('http');


const port=process.env.port || 3000
connectDB();
require('dotenv').config();
const app=express();

const allowedOrigins = ['http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow credentials
}));
app.use(cookieparser());
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use('/vgs/user',UserRoutes);
app.use('/vgs/category',CategoryRoutes);
app.use('/vgs/product',ProductRoutes);
app.use('/vgs/cart',CartRoutes);
app.use('/vgs/uploads',UploadRoutes);
app.use('/vgs/address',addressRoutes);
app.use('/vgs/order',orderRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.all('*',async(req,res,next)=>{
    next(new CustomError('The given path is not available',500))
})

app.use(ErrorHandler);
app.listen(port,()=>{
    console.log('server started successfully');
});