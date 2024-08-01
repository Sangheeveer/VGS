const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    name:{
        type:String,
        required:[true,'Product Name required']
    },
    unit:{
        type: String,
        enum: ['grams', 'kgs', 'litres', 'millilitres'], 
        required: [true, 'Unit required'] 
    },
    stock:{
        type:Number,
        required: [true, 'Stock field required'],
        min:0,
        max:255
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category"
    },
    price:{
        type: String,
        required: [true, 'price field required'],
    },
    description:{
        type: String,
        required: [true, 'Description field required'],
    },
    brand:{
        type: String,
        required: [true, 'Brand name required'],
    },
    image:{
        data:Buffer,
        contentType:String
        // type:String,
        // required: [true, 'Image is required'],

    }
},
{ timestamps: true }
);

const  product= mongoose.model("product", productSchema);
module.exports=product;   