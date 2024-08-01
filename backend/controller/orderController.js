const CustomError=require('./../middleware/CustomError.js');
const ErrorHandler= require('./../middleware/ErrorHandler.js');
const AsyncErrorHandler=require('./../middleware/AsyncErrorHandler');
const Order=require('./../models/orderModel.js');
const mongoose=require('mongoose');


const addOrder=AsyncErrorHandler(async(req,res,next)=>{
    const orderDetails=req.body;
    const user=orderDetails.user;
    delete orderDetails.user;
    
    let newOrderId    

    if (!orderDetails || Object.keys(orderDetails).length === 0) {
        return next(new CustomError('Invalid address data', 400));
    }

    const userOrderDoc = await Order.findOne({ user: user });

    console.log(userOrderDoc)

    if (userOrderDoc) {
        // User already has an address document, update it
        const newOrderItem={
            ...orderDetails,
            isPaid : true,
            paidAt : Date.now(),
            isDelivered : true,
            deliveredAt : Date.now(),
            _id: new mongoose.Types.ObjectId(),
        }

        userOrderDoc.orderDetails.push(newOrderItem);

        await userOrderDoc.save();

        newOrderId=newOrderItem._id

        console.log('order added successfully');

        res.status(201).json({
            status: 201,
            data: {
                orderId: newOrderId,
                message: 'order added successfully',
            },
        });
    } else {
        // Create a new address document for the user
    
        const orderDoc = new Order({
            user: user,
            orderDetails: [{
                ...orderDetails,
                isPaid : true,
                paidAt : Date.now(),
                isDelivered : true,
                deliveredAt : Date.now(),
                _id: new mongoose.Types.ObjectId(),
            }],
        });

        await orderDoc.save();

        newOrderId=orderDoc._id;

        console.log('New order document created and order added successfully');
        res.status(201).json({
            status: 201,
            data: {
                orderId:newOrderId,
                message: 'New order document created and order added successfully',
            },
        });
    }
});


module.exports={addOrder};