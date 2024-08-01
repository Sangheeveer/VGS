import React from 'react';

const DetailsOfUser = ({show,handleClose}) => {
  console.log(show);
  return (
    
    <div>
    {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" 
aria-controls="offcanvasRight"></button> */}

<div className={`offcanvas offcanvas-end  text-bg-dark ${show?'show':""}`} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasRightLabel">Hey!user</h5>
    <button type="button" className="btn-close text-reset  btn-close-white" onClick={handleClose} aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <p>Phone:{}</p>

    <p>saved Address:{}</p>

    <p>email</p>

  </div>
</div>
</div>

  )
}

export default DetailsOfUser;