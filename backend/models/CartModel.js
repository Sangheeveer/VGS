const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { data:Buffer,contentType:String},
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"category"
  },
  });
  

const cartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    
    cartItems:[productSchema],
    wishlist:[productSchema]

},
{ timestamps: true }
);

const cart = mongoose.model("cart", cartSchema);

module.exports=cart;