import axios from 'axios';
import {ADDRESS_URL} from './../utils/Constants';

export const addAddress= async (userId,newAddress)=>{
    console.log(newAddress);
    const res = await axios.post(`http://localhost:3000${ADDRESS_URL}/addaddress/`+userId,newAddress,{
        withCredentials: true,
    });
    return res; 
}    

export const getAddress= async (userId)=>{
    const res = await axios.get(`http://localhost:3000${ADDRESS_URL}/getaddress/`+userId,{
        withCredentials: true,
    });
    return res; 
} 

export const deleteAddress= async (userId,id)=>{
    const res = await axios.delete(`http://localhost:3000${ADDRESS_URL}/deleteaddress/${userId}/${id}`,{
        withCredentials: true,
    });
    return res; 
}   

export const editAddress= async (userId,id,newAddressData)=>{
    const res = await axios.put(`http://localhost:3000${ADDRESS_URL}/editaddress/${userId}/${id}`,newAddressData,{
        withCredentials: true,
    });
    return res; 
}   