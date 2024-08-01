import React from 'react';
import { Link } from 'react-router-dom';
import './../styling/orderFinalPage.css';
import { useLocation } from 'react-router-dom';

const OrderFinalPage = () => {
    let location = useLocation();
  const { orderId } = location.state || {};
  return (
    <div className='container container-orderfinalpage' style={{ marginTop: "60px" }}>
      <div className="slidecard-container">
        <div className="topcircle">
          <i className="bi bi-check"></i>
        </div>
        <div className="card slidecard">
          <div className="card-body">
            <h2 className="card-title fs-1">Thank You!</h2>
            <p className="card-text">Your order was placed successfully</p>
            <p className="card-text">OrderId:{orderId}</p>
            <div className="buttonslide">
              <Link to="/" className="btn btn-primary">Ok</Link>
            </div>
          </div>
        </div>
      </div>
      <p className='slide'>Order Placed</p>
    </div>
  )
}

export default OrderFinalPage;
