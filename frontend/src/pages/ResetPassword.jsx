import React,{useEffect,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendingToken } from '../apiEndpoints/authApi';
import Toast from '../utils/Toast';

const ResetPassword = () => {
  let navigate=useNavigate();
  const [token,setToken]=useState("");
  const [Password,setPassword]=useState("");
  const [conformPassword,setConformPassword]=useState("");
  const [reset,setReset]=useState("")

  const submitHandler=async ()=>{
     if (Password === conformPassword){
       console.log(true);
       try{
         const res= await sendingToken({token,Password});
         setReset(res.data.message);
         setTimeout(() => {
          navigate("/login");
          }, 2000);
       }catch(err){
        console.log(err.data.error);
       }
     }
     else{
      setReset("Password does not Match");
     }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='col-sm-10 col-md-12 col-lg-9'>
          <div className='border border-0 p-4 rounded-3 shadow p-3 mb-5 bg-body ' style={{ width: '100%' }}>
            <form >
              <p style={{ textAlign: 'center' ,fontSize:"25px"}}>Reseting Password</p>
              <div className="mb-3">
                <label htmlFor="token" className="form-label">Token:</label>
                <input type="email" className="form-control" id="token" placeholder="Enter Token" value={token} name="token" onChange={(event) => setToken(event.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={Password} name="password" onChange={(event) => setPassword(event.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="conformPassword" className="form-label">ConformPassword:</label>
                <input type="password" className="form-control" id="conformpassword" placeholder="Enter password" value={conformPassword} name="conformpassword" onChange={(event) => setConformPassword(event.target.value)} />
              </div>
              <button type="button" className="btn btn-warning text-dark" onClick={submitHandler}>Submit</button><br/><br/>
              <Link to="/" style={{  textDecoration: 'none' }}>Back to Login</Link>
      
              {reset && <Toast message={reset}/>}
              {}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword