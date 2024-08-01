import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateToken } from '../apiEndpoints/authApi';
import Toast from '../utils/Toast';
import axios  from 'axios';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [tokenSend, setTokenSend] = useState(false);
  const [alert,setAlert]=useState(false);

  const submitHandler = async () => {
    try {
      setTokenSend(true);
      const res = await generateToken({ email });
      setTimeout(() => {
      navigate("/profile/resetPassword");
      }, 2000);
    } catch (err) {
      setTokenSend(false);
      console.log(err.response.data.error);
    }
  }
  
  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='col-sm-10 col-md-10 col-lg-10 text-dark'>
          <div className='border border-0 p-4 rounded-3 shadow p-3 mb-5 bg-body ' style={{ width: '100%' }}>
            <form >
              <p style={{ textAlign: 'center',fontSize:"20px" }}>Forget Password?</p>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} name="email" onChange={(event) => setEmail(event.target.value)} />
              </div>
              {email.length>0 ?<span style={{color:"Highlight"}}> Please enter registered email Only ...</span>:""}<br/>
              <button type="button" className="btn btn-warning text-dark" onClick={submitHandler}>Submit</button><br/><br/>
              <Link to="/" style={{ textDecoration: 'none' }}>Back to Login</Link>
              {console.log(tokenSend,"inside")}
              {tokenSend && <Toast message={"Please check Mail. Security token send successfully"}/>}
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ForgetPassword;
