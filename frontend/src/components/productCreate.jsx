import React,{useEffect,useState} from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './../styling/productcreate.css';
import { addProducts } from '../apiEndpoints/productApi';
import {toast} from 'react-toastify';

const ProductCreate = () => {
  const {categoryId}=useParams();
  console.log(categoryId,"car")
  const navigate=useNavigate();
  const [name,setName]=useState("");
  const [unit,setUnit]=useState("");
  const [stock,setStock]=useState("");
  const [price,setPrice]=useState("");
  const [brand,setBrand]=useState("");
  const [description,setDescription]=useState("");
  const [isEmptyField, setIsEmptyField] = useState(false);

  const user=useSelector((state)=>state.auth);
  console.log(user.user._id,"otptitpiti");
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescription(value);
    }
  };

  const submitHandler=async (event)=>{
   event.preventDefault() ;
   if (!name || !unit || !stock || !price || !brand || !description) {
    setIsEmptyField(true);
    return;
  }

   try{
    
        console.log("xdffhf")
        const productDetails={user:user.user._id,category:categoryId,name,unit,stock,price,brand,description}
        console.log(productDetails);
        const product=await addProducts(productDetails);
        console.log(product,"Product");
        navigate(`/imageupload/${product.data.data.newProduct._id}`);

   }catch(error){
        toast.error(error);
   }
   
  }

  return (
    <div className="container product" style={{ marginTop: "50px" }}>
    <div className="mb-1 fs-1">Creating a new product...</div>
    <div className="row justify-content-center mt-3">
      <div className=" col-md-8 col-lg-8 col-xs-12">
        <form className="mt-2 ms-sm-3 ms-lg-5 border border-3 p-3 rounded  shadow productcreate"  onSubmit={(event)=>{submitHandler(event)}}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Product Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="unit" className="form-label">
              Unit:
            </label>
            <select
              type="text"
              className="form-control"
              id="unit"
              placeholder="quantity"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
             <option value="">select a unit ...</option>   
             <option value="grams">grams</option>   
             <option value="kgs">Kgs</option>
             <option value="litres">litres</option>
             <option value="millilitres">millilitres</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Rate/Unit:
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              stock:
            </label>
            <input
              type="number"
              className="form-control"
              id="stock"
              placeholder="product name"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>  

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
                className="form-control"
                id="description"
                placeholder="Add Description (maximum 200 characters)"
                value={description}
                onChange={handleDescriptionChange}
                maxLength="200"
              />
              <small>{description.length}/200 characters</small>
          </div>

          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Brand:
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              placeholder="Brand Name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          {isEmptyField && (
              <div className="alert alert-danger d-flex justify-content-between" role="alert">
                Please fill in all fields
                <button type="button" className="btn-close "  data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              
            )}
          <div className="mt-3 mb-3 d-flex justify-content-end">
          
            <button
              type="submit"
              className="btn btn-dark text-warning"      
                       
            >
              Proceed...
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default ProductCreate;