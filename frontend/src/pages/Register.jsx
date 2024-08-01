import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { registerUser } from '../apiEndpoints/authApi';
import Alert from '../components/common/alert';
import {toast} from 'react-toastify';

const Register = () => {
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [phoneno,setPhoneno]=useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');

    // useEffect(()=>{
         
    // },[]);

    const submitHandler=async(event)=>{
        event.preventDefault();
        try{
          if(password === confirmPassword){
             const response= await registerUser({name,email,password,phoneno});
             setAlertMessage('Rgistered Successfully');
             setAlertStatus('success');
             setTimeout(() => {
              navigate("/login");
               }, 3000);
              }
              

        }catch(error){
           setAlertMessage('Registration failed!');
           setAlertStatus('danger');
        }
    }


  return (
    <div className="container" style={{marginTop:"60px"}}>
        
      <div className="row justify-content-center mt-6">

        <div className="col-md-8 col-xs-12">
        <span className='badge   rounded-pill bg-warning text-dark border border-0 shadow mb-3' style={{fontSize:"1.5rem",padding:"0.5rem 1rem"}}>Sign-Up</span>
        <form className='mt-2 ms-sm-3 ms-lg-5 border border-0 rounded-2 p-4  shadow' style={{backgroundColor:"white"}}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>  
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
            <label htmlFor="phoneno" className='form-label'>Phone Number</label>
            <input type="tel" className='form-control' id='phoneno' 
            placeholder='Phone Number' value={phoneno} onChange={e=>setPhoneno(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {password !== confirmPassword && confirmPassword !== '' && <span className='text-danger'>Should be same as password</span>}<br />        
        <button type="submit" className="btn btn-dark text-warning shadow" onClick={(event)=>submitHandler(event)}>
          Register
        </button>

        <button type="submit" className="btn">
            <Link className="text-decoration-none text-dark" to='/'>
                <span className="link-text">Existing User? Log in</span>
            </Link>
        </button>
      </form>
      {alertMessage && <Alert message={alertMessage} status={alertStatus} />}
        </div>
      </div>
    </div>
  )
}

export default Register;