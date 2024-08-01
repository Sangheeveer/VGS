import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAddress } from '../apiEndpoints/addressApi';
import { addOrder } from '../apiEndpoints/orderApi';
import { toast } from 'react-toastify';
import { clearCart } from '../actions/CartActions';
import './../styling/placingOrderPage.css';
import Loader from '../components/elements/loader';


const PlacingOrderPage = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const cart=useSelector((state)=>state.cart);
  const user=useSelector((state)=>state.auth);
  const [orderData,setOrderData]=useState([]);
  const [id,setId]=useState("");
  const [paymentMethod,setPaymentMethod]=useState("");
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [load,setLoad]=useState(false);

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  console.log([...cart.cartItems]);
  console.log(user.user._id);
  // console.log(user._id);
  const fetchAddress = async () => {
    try {
      setLoad(true);
      const response = await getAddress(user.user._id);
      // Do something with the response
      console.log(response);
      setOrderData(response.data.data.userAddressDoc.addresses);
      setLoad(false);
      console.log(response.data.data.userAddressDoc.addresses,"ASdqwe");
    } catch (error) {
      setLoad(false);
      console.error("Error fetching address:", error);
    }
  };

   const calculateDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 4);
    return deliveryDate;
  };

  const handleSubmit=async()=>{
    const orderDetails={
      user:user.user._id,
      orderItems:[...cart.cartItems],
      shippingAddress:id,
      status:"Ordered",
      paymentMethod:paymentMethod,
      itemsPrice:cart.itemsPrice,
      taxPrice:cart.taxPrice,
      shippingPrice:cart.shippingPrice,
      totalPrice:cart.totalPrice,
      deliveredAt:calculateDeliveryDate(),
    }
    try{
    const res=await addOrder(orderDetails);
    dispatch(clearCart());
    navigate('/orderfinalpage',{state:{orderId:res.data.data.orderId}}) 
    }catch(error){
     toast.error(error)
    }
  }

  useEffect(()=>{
   fetchAddress();
  },[])

  return (
    <div className='container place-container' style={{marginTop:"60px"}}>
      {load?(<Loader/>):(<>
         <h6 className='heading'> Select Address</h6>
          {orderData.map((address)=>(<>
            <div className='border shadow rounded-1'>
               <p><input type="radio" onClick={()=>setId(address._id)}/>
               <b>{address.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{address.phoneno}</b>
               <p>{address.address},{address.locality},{address.city},{address.state}-{address.pincode}</p>
               </p>
            </div>
          <h6 className='heading'>Select Payment</h6>
          <div className='border  shadow rounded-1'>
          <p><input type="radio" onClick={()=>setPaymentMethod("cash on delivery")}/><b>Cash On Delivery</b><br/>
              <small>we are facing issues with upi/card payments</small>
          </p>
          
          </div>
          </>))}
        <div className="fixed-bottom border border-0 shadow-0.5g p-1">
        <div className="container card-container-fix">
          <div className="d-flex justify-content-around align-items-center">
            <span className="grand-total">Grand Total:<b> {cart.totalPrice} Rs.</b></span>
            <div>
              <button className='btn btn-dark text-warning conbutton me-2' onClick={toggleCollapse}>
                {isCollapseOpen ? 'Hide Details' : 'View Price'}
              </button>
              <button className='btn btn-dark text-warning' onClick={handleSubmit}>Order</button>
            </div>
          </div>
          <div className={`collapse ${isCollapseOpen ? 'show' : ''} collapse-up`}>
            <div className="card card-body" id="priceList">
              <table className="border border-0">
                <thead className="table">
                  <tr className="head">
                    <th>ItemPrices</th>
                    <th>ShippingPrice</th>
                    <th>Taxprice</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{cart.itemsPrice} .Rs</td>
                    <td>{cart.shippingPrice} .Rs</td>
                    <td>{cart.taxPrice} .Rs</td>
                    <td>{cart.totalPrice} .Rs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>)}    
    </div>
  )
}

export default PlacingOrderPage;