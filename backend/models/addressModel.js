const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    addresses: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        phoneno:{
          type:String,
          required:[true,"PhoneNo is required"],
          match: [
              /^[4-9][0-9]{9}$/,
              "Please add a valid PhoneNo",
            ],        
      },
      locality:{
        type: String,
        required: true,
      },
        city: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
