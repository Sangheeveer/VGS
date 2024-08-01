import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../apiEndpoints/authApi';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector,useDispatch} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {addUser} from './../actions/AuthAction';
import { getCartItems } from '../apiEndpoints/cartApi';
import { saveCart } from '../actions/CartActions';
import axios from 'axios';
import './../styling/loginPage.css';
import vgs from "./../vgs11.png";

const Login = () => {
   const navigate = useNavigate(); 
   const dispatch=useDispatch();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const user= useSelector((state)=>state.auth)

   const submitHandler = async (event) => {
      event.preventDefault();
      try {
         const response=await loginUser({ email, password });
         console.log(response,"inlog");
         dispatch(addUser(response.data.data));
         const citems=await getCartItems(response.data.data._id);
         console.log(citems.data.cartItems);

         dispatch(saveCart(citems.data.cartItems));
         if (response.data.data.isAdmin) {
            navigate('/adminhomepage');
          } else {
            navigate('/');
          }
      } catch (error) {
        toast.error(error.response.data.error, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            toastStyle: { backgroundColor: 'red' }
      })
      }
   }
   return (
      <div className="wrapper">
         <ToastContainer />
         <div className="logo">
            <img src={vgs} alt="VGS"/>
         </div>
         <div className="text-center mt-4 name">
            Login
         </div>
         <form className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
               <span className="far fa-user"></span>
               <input type="text" name="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-field d-flex align-items-center">
               <span className="fas fa-key"></span>
               <input type="password" name="password" id="pwd" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-dark  mt-3" onClick={submitHandler}>Login</button>
         </form>
         <div className="text-center fs-6 ">
            <Link className="wrapbutton" to='/forgetpassword'>Forget password?</Link> or <Link className="wrapbutton" to='/register'>Sign up</Link>
         </div>
      </div>
   );
}

export default Login;
