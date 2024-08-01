import React, { useEffect, useState, useRef } from 'react';
import './../styling/addressPage.css';
import AddressFormPage from '../components/elements/addressFormPage';
import { useSelector } from 'react-redux';
import { addAddress, editAddress, getAddress, deleteAddress } from './../apiEndpoints/addressApi';
import { toast } from 'react-toastify';
import Loader from '../components/elements/loader';

const AddressPage = () => {
  const [addressData, setAddressData] = useState({
    name: "",
    phoneno: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: ""
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const popoverRef = useRef(null);
  const [load, setLoad] = useState(false);

  const handleAddAddressClick = () => {
    setIsAddingAddress(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleCancelClick = () => {
    setIsAddingAddress(false);
    setIsEditingAddress(null);
    setAddressData({
      name: "",
      phoneno: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: ""
    });
  };

  const handlePopOverEdit = (address) => {
    setIsEditingAddress(address._id);
    setAddressData(address);
    setIsAddingAddress(false);
    setIsEditMode(false);
  };

  const handleEditClick = (address) => {
    setIsEditMode(true);
    setAddressData(address);
    setIsAddingAddress(false);
  };


  
  const fetchAddresses = async (userId) => {
    setLoad(true);
    try {
      const response = await getAddress(userId);
      console.log(response,new Date().getTime);
      setAddresses(response.data.data.userAddressDoc.addresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoad(false);
    }
  };

  const createAddress = async () => {
    setLoad(true);
    try {
      const newAddress = { ...addressData };
      await addAddress(user._id, newAddress);
      setIsAddingAddress(false);
      setAddressData({
        name: "",
        phoneno: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: ""
      });
      await fetchAddresses(user._id);
      toast.success('Address added successfully');
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Error adding address');
    } finally {
      setLoad(false);
    }
  };

  const saveEditAddress = async () => {
    setLoad(true);
    try {
      console.log(user._id, isEditingAddress, addressData)
      await editAddress(user._id, isEditingAddress, addressData);
      setIsEditingAddress(null);
      setIsEditMode(false);
      setAddressData({
        name: "",
        phoneno: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: ""
      });
      await fetchAddresses(user._id); // Fetch addresses after editing
      toast.success('Address updated successfully');
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Error updating address');
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchAddresses(user._id);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsEditingAddress(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const deleteAdd = async (userId, id) => {
    setLoad(true);
    try {
      const response = await deleteAddress(userId, id);
      await fetchAddresses(userId); // Refresh addresses after deletion
      toast.success(response.data.data.message);
    } catch (error) {
      toast.error('Error deleting address');
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="container">
      {load ? (<Loader />) : (
        <>
          <div className="text">Manage Addresses</div>
          <div className="row d-flex justify-content-center align-items-center">
            <div className={`border border-2 ${isAddingAddress ? 'background-active' : ''}`}>
              <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={handleAddAddressClick}>
                + Add A NEW ADDRESS
              </button>
              {isAddingAddress && <AddressFormPage
                addressData={addressData}
                handleInputChange={handleInputChange}
                handleCancelClick={handleCancelClick}
                createAddress={createAddress}
              />}
            </div>
            <div className='addresses-box' ref={popoverRef}>
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div key={address._id} className="address-card">
                    {(isEditingAddress === address._id && isEditMode) ? (
                      <div className="col-md-10 mb-4">
                        <AddressFormPage
                          addressData={addressData}
                          handleInputChange={handleInputChange}
                          handleCancelClick={handleCancelClick}
                          createAddress={saveEditAddress}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="address-details">
                          <div className='addressborder'>
                            <b className='p1'>{address.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{address.phoneno}</b>
                            <p>{address.address},{address.locality},{address.city},{address.state}-{address.pincode}</p>
                          </div>
                          <div className="popover-container">
                            <button
                              className="btn threedot"
                              onClick={() => handlePopOverEdit(address)}
                            >
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <div className={`popover ${isEditingAddress === address._id ? 'show' : ''}`}>
                              <div className="popover-body">
                                <button className="btn btn-link" onClick={() => handleEditClick(address)}>Edit</button>
                                <button className="btn btn-link" onClick={() => deleteAdd(user._id, address._id)}>Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>No addresses found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressPage;
