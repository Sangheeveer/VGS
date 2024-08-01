import { Modal } from 'bootstrap';
import React,{useEffect,useState} from 'react'

const EditProductModal = ({ product, show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    price: '',
    stock: '',
    description: '',
    brand: ''
});

useEffect(() => {
    if (product) {
        setFormData({
            name: product.name,
            unit: product.unit,
            price: product.price,
            stock: product.stock,
            description: product.description,
            brand: product.brand
        });
    }
}, [product]);

const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [id]: value
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    handleSave({ ...formData });
};

return (
    <div className={`modal fade ${show ? 'show' : ''}`} id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden={!show} style={{ display: show ? 'block' : 'none',backdropFilter: show ? 'blur(1px)' : 'none'  }}>
        <div className="modal-dialog modal-dialog-centered " >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editProductModalLabel" style={{color:"steelblue"}}>Edit Product</h5>
                    <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit} className="border border-0 ">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit" className="form-label">Unit:</label>
                            <select
                                className="form-control"
                                id="unit"
                                value={formData.unit}
                                onChange={handleChange}
                            >
                                <option value="">select a unit ...</option>
                                <option value="grams">grams</option>
                                <option value="kgs">Kgs</option>
                                <option value="litres">litres</option>
                                <option value="millilitres">millilitres</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Rate/Unit:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">Stock:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                className="form-control"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                maxLength="200"
                            />
                            <small>{formData.description.length}/200 characters</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="brand" className="form-label">Brand:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-3 mb-3 d-flex justify-content-end">
                            <button type="submit" className="btn btn-dark text-warning">Proceed...</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
}

export default EditProductModal