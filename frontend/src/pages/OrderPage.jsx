import React, { useEffect, useState } from "react";
import { useLocation, useParams,useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const { quant } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const price = params.get("price");
  const productId = params.get("productId");
  const productName = params.get("productName");
  const categoryName = decodeURIComponent(params.get("categoryName"));
  console.log(quant);
  const [quantity, setQuantity] = useState("");

  const getTotal = (quantity) => {
    return quantity * price;
  };

  const isAvailable = (parseInt(quant) - parseInt(quantity)) > 0;

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <span
        className="badge rounded-pill bg-dark ms-4 text-warning  px-3 py-2 shadow"
        style={{ fontFamily: "sans-serif", fontSize: "1.5rem" }}
      >
        {productName} - {categoryName}
      </span>

      <div className="row justify-content-center mt-3">
        <div className="col-md-5 col-xs-12">
          <form className="mt-2 ms-sm-3 ms-lg-5">

            <div className="mb-3">
              Availability: {isAvailable ?
                <span className="text-success">Instock</span> :
                <span className="text-danger">Out of Stock</span>}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                placeholder="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Price:
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Total:
              </label>
              <input
                type="text"
                className="form-control"
                id="total"
                placeholder="Total Price"
                value={`${getTotal(quantity).toFixed(2)}`}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-warning text-dark"
                disabled={!isAvailable} 
                onClick={()=>{navigate('/cartpage')}}
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
