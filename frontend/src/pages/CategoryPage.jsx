import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import OrderPage from "./OrderPage";
import { getAProducts } from "../apiEndpoints/productApi";
import { addToCart } from "../actions/CartActions";
import typedArrayToBase64 from "../utils/typedArraytobase64";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/vgs/category/allcategory")
      .then((res) => {
        setCategories(res.data.data.categories);
        console.log("Categories:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

    axios
      .get("http://localhost:3000/vgs/product/")
      .then((res) => {
        setProducts(res.data.data.products);
        setLoading(false); // Set loading to false after fetching products
        console.log("Products:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const addItemCart = async (cId, pId) => {
    const aProduct = await getAProducts(pId);

    const {
      name,
      image,
      price,
      stock: countInStock,
      _id: product,
      category,
    } = aProduct.data.data.products;

    dispatch(
      addToCart({
        name,
        image,
        price,
        countInStock,
        product,
        category,
        qty: quantity,
      })
    );
    setQuantity(1);
  };

  return (
    <div className="container p-5" style={{ marginTop: "50px" }}>
      {categories.map((category) => (
        <div className="border border-2 m-3 rounded-5" key={category._id}>
          <h2 className="mt-3 ms-3 me-3 mb-0">{category.categoryName}</h2>
          <div
            className="d-flex flex-row flex-nowrap hide-scrollbar"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "10px",
              scrollbarWidth: "none", /* Firefox */
              msOverflowStyle: "none", /* Internet Explorer 10+ */
            }}
          >
            <style>
              {`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none; /* Safari and Chrome */
                }
              `}
            </style>
            {loading ? (
              <p>Loading...</p>
            ) : (
              products
                .filter(
                  (product) => String(product.category) === String(category._id)
                )
                .map((product) => (
                  <div
                    key={product._id}
                    className="card border-0 rounded-1 m-3 shadow bg-body-tertiary"
                    style={{
                      display: "inline-block",
                      minWidth: "300px",
                      maxWidth: "300px",
                      height: "auto",
                      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={typedArrayToBase64(product?.image?.data?.data)}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "fill",
                      }}
                    />
                    <div className="card-body" style={{ overflow: "hidden" }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title text-truncate col-8">
                          {product.name}
                        </h4>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="card-text custom-fs-4">
                          &#8377; {product.price}
                        </span>
                        <input
                          type="number"
                          min="1"
                          defaultValue="1"
                          className="form-control border border-2"
                          style={{ width: "60px" }}
                          onChange={(e) => {
                            setQuantity(parseInt(e.target.value));
                          }}
                        />
                      </div>
                      <div className="row align-items-center text-center mt-2">
                        <div className="col-3">
                          <button
                            className="border border-0 bg-white"
                            onClick={() =>
                              addItemCart(category._id, product._id)
                            }
                          >
                            <i className="bi bi-cart3 fs-2"></i>
                          </button>
                        </div>
                        <div className="col-9 mb-0 me-0 d-flex justify-content-end">
                          <button className="btn btn-dark text-warning rounded-0 col-9">
                            <Link
                              to={`/orderpage/${product.stock}?price=${
                                product.price
                              }&categoryName=${encodeURIComponent(
                                category.categoryName
                              )}&productId=${product._id}&productName=${
                                product.name
                              }`}
                              className="text-warning"
                              style={{ textDecoration: "none" }}
                            >
                              Buy Now
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
