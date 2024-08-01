import React, { useState } from 'react';
import { categoryCreate } from '../../apiEndpoints/categoryApi';
import {toast} from 'react-toastify';
import { useParams } from 'react-router-dom';
import { editCategory } from '../../apiEndpoints/categoryApi';


const CategoryCreate = () => {
  let {id}=useParams();
  const [category, setCategory] = useState("");
  const [create,setcreate]=useState("")

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if(!id){
        
      const res = await categoryCreate(category);
      toast.success('Category created successfully');
      }
      else{ 
        console.log("bad morning");
 
      const res = await editCategory(id,category);

      toast.success('Category updated successfully');
      }
    } catch (error) {
     
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="container mt-5 justify-content-center">
    <div style={{ marginBottom: "15%" }}>
      <h3 className="text-left">{id ? 'Edit' : 'Create'} Category</h3>
    </div>
    <div className="align-items-center col-md-6 col-lg-7 col-xl-8 m-auto bg-grey">
      <div className="border border-2 p-5 rounded-4" style={{ backgroundColor: "#dddddd" }}>
        <form onSubmit={(event) => submitHandler(event)}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category Name:</label>
            <input
              type="text"
              className="form-control"
              id="category"
              placeholder="Enter category name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mt-3 mb-3 d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-warning text-dark"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};


export default CategoryCreate;
