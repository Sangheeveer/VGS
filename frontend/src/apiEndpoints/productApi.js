import axios from 'axios';
import {PRODUCT_URL} from './../utils/Constants';

export const getProducts= async ()=>{
    const res = await axios.get(`http://localhost:3000${PRODUCT_URL}/`);
    return res; 
} 

export const getProductByCategory= async (categoryId)=>{
    const res = await axios.get(`http://localhost:3000${PRODUCT_URL}/`+categoryId ,{
        withCredentials: true,
    });
    return res; 
} 

export const getAProducts= async (id)=>{
    const res = await axios.get(`http://localhost:3000${PRODUCT_URL}/getoneproduct/`+id,{
        withCredentials: true,
    });
    return res; 
} 

export const addProducts= async (productDetails)=>{
    console.log("hi ra")
    const res = await axios.post(`http://localhost:3000${PRODUCT_URL}/addproduct`,productDetails,{
        withCredentials: true, 
    });
    return res; 
} 

export const uploadImage= async ()=>{
    const res = await axios.post(`http://localhost:3000${PRODUCT_URL}/addproduct`,{
        withCredentials: true,
    });
    return res; 
} 

export const updateProductsById= async (id,productDetails)=>{
    const res = await axios.put(`http://localhost:3000${PRODUCT_URL}/updateproduct/`+id,productDetails ,{
        withCredentials: true,
    });
    return res; 
} 

export const deleteProduct= async (id)=>{
    const res = await axios.delete(`http://localhost:3000${PRODUCT_URL}/deleteproduct/`+id,{
        withCredentials: true,
    });
    return res; 
} 