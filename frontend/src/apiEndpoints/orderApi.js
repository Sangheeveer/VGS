import axios from 'axios';
import {ORDER_URL} from './../utils/Constants';

export const addOrder= async (orderDetails)=>{
    const res = await axios.post(`http://localhost:3000${ORDER_URL}/addorder`,orderDetails,{
        withCredentials:true,
    });
    return res; 
} 
