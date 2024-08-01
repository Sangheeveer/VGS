import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryDisplay from './categoryDisplay';

const AdminHomePage = () => {
    let navigate=useNavigate();
    const handleClick = () => {
        navigate('/categorycreate');
      };
  return (
    <div className="container" style={{marginTop:"50px"}}>
      <CategoryDisplay/>
    <button 
      className="btn btn-success position-fixed  m-3  d-flex rounded-square align-items-center justify-content-center p-2 fs-2" 
      style={{ textAlign:"center",zIndex: 1000, width: '100px', height: '50px',bottom:'20px',right:"40px" }} 
      onClick={handleClick}
    >
      +
    </button>
    </div>
  )
}

export default AdminHomePage;