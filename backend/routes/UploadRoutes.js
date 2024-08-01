const express=require('express');
const multer=require('multer');
const path=require('path');
const fs= require('fs');
const CustomError=require('./../middleware/CustomError');
const router=express.Router();
const Product=require('./../models/ProductModel');
const AsyncErrorHandler=require('./../middleware/AsyncErrorHandler')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        let ext=path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

const upload=multer({storage,
    fileFilter:function(req,file,cb){
        const validExtensions = ['.jpg', '.jpeg', '.png'];
        const extname = validExtensions.includes(path.extname(file.originalname).toLowerCase());
        const mimetype = file.mimetype.startsWith('image/');
        
        if (extname && mimetype) {
          return cb(null, true);
        } else {
          return cb(new CustomError("Please upload Images Only!"));
        }        
            },
    limits:{
        fileSize:3*1024*1024 
    }       
});

router.put('/uploadimage/:id',upload.single('image'),AsyncErrorHandler(async(req,res,next)=>{
    const productId=req.params.id
    const pFind=await Product.findById({_id:productId});
    if(pFind){
        pFind.image.data = fs.readFileSync(req.file.path);
        pFind.image.contentType = `image/${path
        .extname(req.file.originalname)
        .toLowerCase()
        .replace(".", "")}`;
        await pFind.save();
        res.status(200).json({"message":"Image uploaded successfully..."});
    }
    else{
       return next(new CustomError("Product Not found",400));
    }
}))

module.exports=router;