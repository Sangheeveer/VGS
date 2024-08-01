import React, { useEffect, useState } from 'react';
import './../styling/CartPage.css';
import { useSelector, useDispatch } from "react-redux";
import typedArrayToBase64 from '../utils/typedArraytobase64';
import { addToCart,removeFromCart } from '../actions/CartActions';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [itemsInCart, setItemsInCart] = useState(cart.cartItems);

  useEffect(() => {
    setItemsInCart(cart.cartItems);
  }, [cart.cartItems]);

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  const handleQuantityChange = (cartItem, newQty) => {
    dispatch(addToCart({
      ...cartItem,
      qty: newQty
    }));
  };

  const handleRemoveFromCart = (cartItemId) => {
    console.log(cartItemId);
    dispatch(removeFromCart(cartItemId));
  };

  const handleOrder = () => {
    navigate('/placeorder')
  };

  return (
    <div className='container card-container'>
      {itemsInCart.map((cartItem, index) => (
        <div className="card" key={index}>
          <img src={typedArrayToBase64(cartItem?.image?.data?.data)} className="card-img-top" alt={cartItem.name} />
          <div className="card-body">
            <div className="text-section">
              <h5 className="card-title">{cartItem.name}</h5>
              <p className="card-text">
                <input
                  type="number"
                  min="1"
                  value={cartItem.qty}
                  className="form-control"
                  style={{ width: "60px" }}
                  onChange={(e) => handleQuantityChange(cartItem, parseInt(e.target.value))}
                />
              </p>
            </div>
            <div className="cta-section">
              <span className='price'>Rs.{cartItem.price * cartItem.qty}</span>
              <button className="btn btn-dark text-warning" onClick={() => handleRemoveFromCart(cartItem.product)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      <div className="fixed-bottom border border-0 shadow-0.5g p-1">
        <div className="container card-container-fix">
          <div className="d-flex justify-content-around align-items-center">
            <span className="grand-total">Grand Total: {cart.totalPrice} Rs.</span>
            <div>
              <button className='btn btn-dark text-warning conbutton me-2' onClick={toggleCollapse}>
                {isCollapseOpen ? 'Hide Details' : 'View Price'}
              </button>
              <button className='btn btn-dark text-warning' onClick={handleOrder}>Buy All</button>
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
    </div>
  );
}

export default CartPage;
