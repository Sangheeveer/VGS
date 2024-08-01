import axios from 'axios';
import {USER_URL} from './../utils/Constants';

export const generateToken= async (body)=>{
    const res = await axios.post(`http://localhost:3000${USER_URL}/forgetpassword`,body);
    return res; 

}    

export const sendingToken= async({token,Password})=>{
    const res = await axios.put(`http://localhost:3000${USER_URL}/resetpassword/`+token,{Password});
    return res;
}

export const loginUser= async({email,password})=>{
    const res = await axios.post(`http://localhost:3000${USER_URL}/userlogin`,{email,password},{
        withCredentials: true,
    });
    
    return res;
}

export const registerUser= async({name,email,password,phoneno})=>{
    const res = await axios.post(`http://localhost:3000${USER_URL}/register`,{name,email,password,phoneno});
    return res;
}

export const logoutUser= async()=>{
    const res = await axios.post(`http://localhost:3000${USER_URL}/logout`);
    return res;
}
