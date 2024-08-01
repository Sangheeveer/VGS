import React, { useEffect, useState } from "react";
import {
  getProductByCategory,
  updateProductsById,
  deleteProduct,
} from "../apiEndpoints/productApi";
import "./../styling/productsPage.css";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import Loader from "./elements/loader";
import EditProductModal from "./editProductModal";
import { toast } from "react-toastify";
import typedArrayToBase64 from "../utils/typedArraytobase64";
import axios from 'axios';
import EditImageModal from "./editImageModal";

const ProductsPage = () => {
  let location = useLocation();
  const { categoryName } = location.state || {};
  let { categoryId } = useParams();
  let navigate=useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productData, setProductData] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchProducts = async (categoryId) => {
    try {
      setLoad(true);
      const res = await getProductByCategory(categoryId);
      setProductData(res.data.data.products);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchProducts(categoryId);
  }, [categoryId]);

  const handleDeleteProduct = async (id) => {
    try {
      const res = await deleteProduct(id);
      toast.success(res.data.data.message);
      fetchProducts(categoryId);
    } catch (error) {
      console.log(error);
      setShowProductModal(false);
      toast.error("An unexpected error occurred");
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const openImageModal = (product) => {
    setSelectedProduct(product);
    setShowImageModal(true);
  };

  const handleImage=async(selectedImage)=>{
    if (!selectedImage) return; 

    const formData = new FormData();
    formData.append("image", selectedImage); 

    try {
      const response = await axios.put(`http://localhost:3000/vgs/uploads/uploadimage/`+selectedProduct._id , formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchProducts(categoryId);
      toast.success("Image uploaded successfully");
      // setShowProductModal(false);
      setShowImageModal(false);
    } catch (error) {
      toast.error("Error uploading image");
    }

  }

  const handleSave = async (updatedProduct) => {
    try {
      const res = await updateProductsById(selectedProduct._id, updatedProduct);
      toast.success(res.data.data.message);
      fetchProducts(categoryId);
      setShowProductModal(false);
    } catch (error) {
      console.log(error);
      setShowProductModal(false);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="container mt-5">
      {load ? (
        <Loader />
      ) : productData.length > 0 ? (
        <>
          <div className="d-flex justify-content-start  lex">
            {categoryName} products
          </div>
          <div className="table-responsive">
            <table className="table table-hover custom-table">
              <thead className="table-dark rounded-thead">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Price</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {productData.map((pro, index) => (
                <tbody key={pro._id}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="image-container">
                        <img
                          src={typedArrayToBase64(pro?.image?.data?.data)}
                          alt={pro.name}
                          className="product-image"
                        />
                        <div className="overlay">
                          <button
                            type="button"
                            className="border border-0 bg-transparent me-3"
                            onClick={() => {
                              openImageModal(pro);}}
                          >
                            <i className="bi bi-pen" id="pen"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>{pro.name}</td>
                    <td>{pro.unit}</td>
                    <td>{pro.stock}</td>
                    <td>{pro.price}</td>
                    <td>{pro.brand}</td>
                    <td>
                      <div className="d-flex mx-2">
                        <button
                          type="button"
                          className="border border-0 bg-transparent me-3"
                          onClick={() => openEditModal(pro)}
                        >
                          <i className="bi bi-pen" id="pen"></i>
                        </button>
                        <button
                          type="button"
                          className="border border-0 bg-transparent"
                          onClick={() => handleDeleteProduct(pro._id)}
                        >
                          <i className="bi bi-trash" id="remove"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </>
      ) : (
        <div className="no-products-message">
          No products Available, Please add products.
        </div>
      )}
      {selectedProduct && showProductModal && (
        <EditProductModal
          product={selectedProduct}
          show={showProductModal}
          handleClose={() => setShowProductModal(false)}
          handleSave={handleSave}
        />
      )}
      {selectedProduct && showImageModal && (
        <EditImageModal
          product={selectedProduct}
          show={showImageModal}
          handleClose={() => setShowImageModal(false)}
          handleSave={handleImage}
        />
      )}
    </div>
  );
};

export default ProductsPage;
