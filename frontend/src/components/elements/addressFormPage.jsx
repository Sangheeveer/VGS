import React from 'react';
import './../../styling/addressPage.css';

const AddressFormPage = ({ addressData, handleInputChange, handleCancelClick, createAddress }) => {
  return (
    <div className="card card-body">
      <form className='form' onSubmit={(e) => { e.preventDefault(); createAddress(); }}>
        <div className="row">
          <div className="col-md-5 mb-4">
            <input 
              type="text" 
              id="name" 
              className="form-control" 
              placeholder='Name'  
              value={addressData.name}
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className="col-md-5 mb-4">
            <input 
              type="tel" 
              id="phoneno" 
              className="form-control" 
              placeholder='10-digit mobile number'  
              maxLength="10"  
              value={addressData.phoneno}
              onChange={handleInputChange} 
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mb-4">
            <input 
              type="text" 
              id="pincode" 
              className="form-control" 
              placeholder='Pincode'  
              value={addressData.pincode}
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className="col-md-5 mb-4">
            <input 
              type="text" 
              id="locality" 
              className="form-control" 
              placeholder='Locality'  
              value={addressData.locality}
              onChange={handleInputChange} 
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className="col-md-10 mb-4">
            <textarea 
              id="address" 
              rows="4" 
              className="form-control" 
              placeholder="Address (Area and Street)" 
              maxLength="150"  
              value={addressData.address}
              onChange={handleInputChange} 
              required
            ></textarea>
          </div> 
        </div>
        <div className="row">
          <div className="col-md-5 mb-4">
            <input 
              type="text" 
              id="city" 
              className="form-control" 
              placeholder='City/District/Town'  
              value={addressData.city}
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div className="col-md-5 mb-4">
            <input 
              type="text" 
              id="state" 
              className="form-control" 
              placeholder='State' 
              value={addressData.state}
              onChange={handleInputChange} 
              required 
            />
          </div>
        </div>
        <div className='button'>
          <button id="save" type='submit'>Save</button>
          <button id="cancel" type='button' onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddressFormPage;
