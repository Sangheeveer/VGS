import React,{useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

const ImageUpload = () => {
  let {id} = useParams();
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
  
    if (!selectedImage) return; 

    const formData = new FormData();
    formData.append("image", selectedImage); 

    try {
      const response = await toast.promise(
        axios.put(`http://localhost:3000/vgs/uploads/uploadimage/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          pending: 'Uploading image...',
          success: 'Image uploaded successfully',
          error: 'Error uploading image ',
        }
      );
      setTimeout(() => {
        navigate('/');
      }, 9000);
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
    <div className="mb-1 fs-1">Upload and Preview Image</div>
    <div className="row justify-content-center mt-3">
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
  );
};


export default ImageUpload;