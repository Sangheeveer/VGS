import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './../styling/profilePage.css';
import { useSelector,useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faLock,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { clearCart } from '../actions/CartActions';
import { removeUser } from '../actions/AuthAction';
import { logoutUser } from '../apiEndpoints/authApi';
import { addCartItems } from '../apiEndpoints/cartApi';
import {toast} from 'react-toastify';

const ProfilePage = () => {
  const [addressPage, setAddressPage] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [resetPasswordPage, setResetPasswordPage] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch=useDispatch();
  const cartItems=cart.cartItems;
  const user = useSelector((state) => state.auth.user);
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : '';

  const handleLogout= async()=>{
   
    try{
      const response=await addCartItems(cartItems);
      await logoutUser();
      dispatch(clearCart());
      dispatch(removeUser());
      toast.success("logout successfully!...");

     }catch(error){
      toast.error(error);
     }  
  }


  return (
    <div className="main-layout">
      <div className="sidebar">
        <div className="name">
          <div className="circle">{firstLetter}</div>
          <div>
            <p className="hello">Hello,</p>
            {user?.name || 'Your Name'}
          </div>
        </div>
        <ul className="profileitems">
          <li>
            <Link to="/profile/addresspage">
              <FontAwesomeIcon icon={faAddressBook} className="fs-1" style={{ color: 'var(--primary-color)' }} />
              Addresses
            </Link>
          </li>
          <li>
            <Link to="/profile/forgetpassword">
              <FontAwesomeIcon icon={faLock} className="fs-1" style={{ color: 'var(--primary-color)' }} />
              Password
            </Link>
          </li>
          <li><button type="submit" className="border border-0" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="fs-1" style={{ color: 'var(--primary-color)' }}/>Logout</button>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
