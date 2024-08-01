const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    orderDetails:[
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
    orderItems:[{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { data: Buffer, contentType: String },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ]  ,
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Address",
      },
    status: {
        type: String,
        enum: ['Pending','Ordered', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
      },
    paymentMethod: { type: String, required: true },
    // paymentResult: {
    //   id: String,
    //   status: String,
    //   update_time: String,
    //   email_address: String,
    // },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date }, 
      
}]},
{ timestamps: true }
);

const  Order= mongoose.model("Order", orderSchema);
module.exports=Order;   