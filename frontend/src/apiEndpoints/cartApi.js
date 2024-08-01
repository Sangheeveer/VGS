import axios from "axios";
import { CART_URL } from "../utils/Constants";
import {toast} from 'react-toastify';


export const getCartItems= async (id)=>{
    const res = await axios.get(`http://localhost:3000${CART_URL}/getitems/`+id,{
        withCredentials: true, 
    });
    return res; 
}    


export const addCartItems= async (cartItems)=>{
    console.log("addcartItems");
    try{
    const res = await axios.post(`http://localhost:3000${CART_URL}/additems`,cartItems,{
        withCredentials: true, 
    });
    return res; 
}catch(error){
    throw error; 
}
}    

