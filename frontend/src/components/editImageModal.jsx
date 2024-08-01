import React,{useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

const EditImageModal = ({ product, show, handleClose, handleSave }) => {
    let id = product._id;
    let navigate=useNavigate();
    const [selectedImage, setSelectedImage] = useState(null); 
    const [preview, setPreview] = useState(null);
  
    
    const handleImageChange = (event) => {
      const file = event.target.files[0]; 
      if (file) {
        setSelectedImage(file);  
  
        const reader = new FileReader();  // Create a FileReader instance
        reader.onloadend = () => {        // Define the onloadend event handler
          setPreview(reader.result);      // Set the preview state with the base64 string result
        };
        reader.readAsDataURL(file);       // Start reading the file as a data URL (base64 string)
      }
    };
  
    // Function to handle image upload
    const handleSubmit = async (event) => {
      event.preventDefault();
      handleSave(selectedImage);
    };

  
    return (
    <div className={`modal fade ${show ? 'show' : ''}`} id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden={!show} style={{ display: show ? 'block' : 'none',backdropFilter: show ? 'blur(1px)' : 'none'  }}>
    <div className="modal-dialog modal-dialog-centered " >
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="editProductModalLabel" style={{color:"steelblue"}}>Edit Image</h5>
                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='d-flex justify-content-center align-items-center'>
            <div className="border border-3 shadow rounded p-3 bocol-md-8 col-lg-8 col-xs-12">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="file" className="form-control" onChange={handleImageChange} />
                </div>
                {preview && (
                    <div className="form-group mt-3">
                    <img src={preview} className="border border-2 shadow rounded mx-auto d-block" alt="Preview" style={{ width: "200px", height: "200px", objectFit: "fill" }} />
                    </div>
                )}
                <button type="submit" className="btn btn-dark text-warning mt-3">Upload Image</button>
                </form>
            </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default EditImageModal;