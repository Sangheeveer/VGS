const CustomError=require('./../middleware/CustomError.js');
const ErrorHandler= require('./../middleware/ErrorHandler.js');
const AsyncErrorHandler=require('./../middleware/AsyncErrorHandler');
const Cart = require('./../models/CartModel');
const {addItemsCart}=require("./../utils/addItemsCart.js");



const createCart=AsyncErrorHandler(async(req,res,next)=>{

    const cartUser=await Cart.findOne({user:req.user._id});

    if(!cartUser){
      const cart= new Cart();
      cart.user=req.user._id;
      await cart.save();

      res.status(200).json({status:200,
        data:{
            message:"Cart created susseccfully..."
        }
    });

    } 
});

const saveCart=AsyncErrorHandler(async(req,res,next)=>{

    const cartUser=await Cart.findOne({user:req.user._id});

    if(!cartUser){
      const cart= new Cart();
      cart.user=req.user._id;
      await cart.save();

      res.status(200).json({status:200,
        data:{
            message:"Cart created susseccfully..."
        }
    });

    } 
});

const addCartitems = AsyncErrorHandler(async (req, res, next) => {
  const cartItems = req.body;
  console.log(cartItems, "QQQQQQQQQQ");
  console.log(req.user._id);

  if (cartItems.length === 0) {
      return res.status(200).json({ message: "Cart Saved" });
  }

  let cart = await Cart.findOne({ user: req.user._id });
  console.log(cart, "before");

  if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({ user: req.user._id, cartItems: [] });
  }

  cart.cartItems = addItemsCart(cart, cartItems);
  console.log(cart, "after");

  const savedCart = await cart.save();
  console.log("hi ra babu")
  res.status(200).json(savedCart);
});

const getCart=AsyncErrorHandler(async(req,res,next)=>{
  const id=req.params.id;
  const cart=await Cart.findOne({user:id});
  res.status(200).json(cart); 
});


module.exports={saveCart,createCart,addCartitems,getCart};