import React from 'react';
import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './../styling/categoryDispaly.css';
import { getCategory,deleteCategory} from '../apiEndpoints/categoryApi';
import { toast } from 'react-toastify';
import Modal from './elements/modal';
import Loader from './elements/loader';

const CategoryDisplay = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [load,setLoad]=useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoad(true);
      const res = await getCategory();
      setData(res.data.data.categories);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const productNavigate = (event,categoryId) => {
    event.stopPropagation();
    navigate(`/productcreate/${categoryId}`);
  };

  const editCategory = (event, id) => {
    event.stopPropagation();
    navigate(`/categorycreate/${id}`);
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await deleteCategory(selectedCategoryId);
      toast.success(response.data.data.message);
      fetchCategories();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleCardClick = (categoryId, catName) => {
    navigate(`/admin/products/${categoryId}`, { state: { categoryName: catName } });
  };

  const openDeleteModal = (event, id) => {
    event.stopPropagation();
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="container mt-2">
      {load?
      (<Loader/>):
      (<div className="row">
        {data.map((cate) => (
          <div className="col-md-4 col-lg-4 mb-4" key={cate._id}>
            <div
              className="card half-half-card m-3"
              onClick={() => handleCardClick(cate._id, cate.categoryName)}
              style={{ width: '18rem' }}
            >
              <div className="card-body bg-white">
                <h1 className="card-title">{cate.categoryName}</h1>
                <h4 id="head">Click to add product</h4>
              </div>
              <button
                type="submit"
                id="plus"
                className="btn btn-primary"
                onClick={(event) =>productNavigate(event,cate._id)}
              >
                +
              </button>
              <div className="card-body text-light d-flex flex-row justify-content-between hi">
                <button
                  type="submit"
                  id="edit"
                  className="btn btn-light rounded-pill fs-3"
                  onClick={(event) => editCategory(event, cate._id)}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  id="delete"
                  className="btn btn-light rounded-pill fs-3"
                  onClick={(event) => openDeleteModal(event, cate._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>)}
      <Modal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDeleteCategory}
      />
    </div>
  );
};
export default CategoryDisplay;