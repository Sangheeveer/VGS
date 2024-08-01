import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Toast = (props) => {
  return (
    <div className="toast show align-items-center text-white bg-success border-0 " role="alert" aria-live="assertive" aria-atomic="true">
    <div className="d-flex">
      <div className="toast-body">
       {props.message}
      </div>
      <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  )
}

export default Toast;