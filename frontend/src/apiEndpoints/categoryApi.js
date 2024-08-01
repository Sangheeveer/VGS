import axios from 'axios';
import {CATEGORY_URL} from './../utils/Constants';

export const getCategory= async ()=>{
    const res = await axios.get(`http://localhost:3000${CATEGORY_URL}/allCategory`,{
        withCredentials: true,
    });
    return res; 
}   

export const categoryCreate= async (categoryName)=>{
    const res = await axios.post(`http://localhost:3000${CATEGORY_URL}/createcategory`,{categoryName},{
        withCredentials: true,
    });
    
    return res; 
}   

export const editCategory= async (id,newData)=>{
    const res = await axios.put(`http://localhost:3000${CATEGORY_URL}/editcategory/`+id,{categoryName:newData},{
        withCredentials: true,
    });

    return res; 
}  

export const deleteCategory= async (id)=>{
    const res = await axios.delete(`http://localhost:3000${CATEGORY_URL}/deletecategory/`+id ,{
        withCredentials: true,
    });
   
    return res; 
} 