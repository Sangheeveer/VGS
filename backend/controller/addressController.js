const CustomError=require('./../middleware/CustomError.js');
const ErrorHandler= require('./../middleware/ErrorHandler.js');
const AsyncErrorHandler=require('./../middleware/AsyncErrorHandler');
const Address=require('./../models/addressModel.js');
const mongoose = require('mongoose');

const addAddress = AsyncErrorHandler(async (req, res, next) => {
    const userId = req.params.userId;
    const newAddress = req.body;
    

    if (!newAddress || Object.keys(newAddress).length === 0) {
        return next(new CustomError('Invalid address data', 400));
    }

    const userAddressDoc = await Address.findOne({ user: userId });
    console.log(userAddressDoc)
    if (userAddressDoc) {
        // User already has an address document, update it
        userAddressDoc.addresses.push({
            ...newAddress,
            _id: new mongoose.Types.ObjectId(),
        });
        await userAddressDoc.save();
        console.log('Address added successfully');
        res.status(201).json({
            status: 201,
            data: {
                message: 'Address added successfully',
            },
        });
    } else {
        // Create a new address document for the user
    
        const addressDoc = new Address({
            user: userId,
            addresses: [{
                ...newAddress,
                _id: new mongoose.Types.ObjectId(),
            }],
        });
        await addressDoc.save();
        console.log('New address document created and address added successfully');
        res.status(201).json({
            status: 201,
            data: {
                message: 'New address document created and address added successfully',
            },
        });
    }
});


const getAddress=AsyncErrorHandler(async(req,res,next)=>{
    const userId=req.params.userId;
    const userAddressDoc = await Address.findOne({ user: userId });

    if(!userAddressDoc){
        return next(new CustomError('No address available for this user',400));
    }

    res.status(201).json({
        status:201,
        data:{
            userAddressDoc
        }
    });
});


const deleteAddress = AsyncErrorHandler(async (req, res, next) => {
    const userId = req.params.userId;
    const id = req.params.id;
    console.log(userId,id);
    // Find the user's address document
    const userAddressDoc = await Address.findOne({ user: userId });
    console.log(userAddressDoc);
    if (!userAddressDoc) {
        return next(new CustomError('No address available for this user', 400));
    }

    // Check if the address exists within the user's address document
    const address = userAddressDoc.addresses.id(id);
    console.log(address);
    if (!address) {
        return next(new CustomError('Address not found', 404));
    }
   console.log(address);
    
    // Delete the address
    userAddressDoc.addresses.pull({ _id:id });
    await userAddressDoc.save();

    console.log(userAddressDoc );
    res.status(200).json({
        status: 200,
        data: {
            message: "Address deleted successfully..."
        }
    });
});

const editAddress = AsyncErrorHandler(async (req, res, next) => {
    const userId = req.params.userId;
    const id = req.params.id;
    const newAddressData = req.body;
  
    console.log(userId, id);
  
    // Find the user's address document
    const userAddressDoc = await Address.findOne({ user: userId });
    console.log(userAddressDoc);
  
    if (!userAddressDoc) {
      return next(new CustomError('No address available for this user', 400));
    }
  
    // Check if the address exists within the user's address document
    const address = userAddressDoc.addresses.id(id);
    console.log(address);
  
    if (!address) {
      return next(new CustomError('Address not found', 404));
    }
  
    // Update the address with the new data
    address.name = newAddressData.name || address.name;
    address.phoneno = newAddressData.phoneno || address.phoneno;
    address.pincode = newAddressData.pincode || address.pincode;
    address.locality = newAddressData.locality || address.locality;
    address.address = newAddressData.address || address.address;
    address.city = newAddressData.city || address.city;
    address.state = newAddressData.state || address.state;
  
    // Save the updated user address document
    await userAddressDoc.save();
  
    console.log(userAddressDoc);
  
    res.status(200).json({
      status: 200,
      data: {
        message: "Address updated successfully",
        address: address,
      },
    });
  });
  



module.exports={addAddress,getAddress,deleteAddress,editAddress}