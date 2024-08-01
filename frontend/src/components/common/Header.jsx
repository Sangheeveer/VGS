import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import vgsc from "../../vgs11.png";
import { useSelector, useDispatch } from "react-redux";
import './../../styling/header.css';
import { clearCart } from "../../actions/CartActions";
import { removeUser } from "../../actions/AuthAction";
import { addCartItems } from "../../apiEndpoints/cartApi";
import { logoutUser } from "../../apiEndpoints/authApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = cart.cartItems;
  const name = user !== null ? user.name : null;
  const location = useLocation();
  const [showNavItems, setShowNavItems] = useState(false);
  const navRef = useRef(null);

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  useEffect(() => {
    if (user && user.isAdmin) {
      setShowNavItems(true);
    } else {
      setShowNavItems(false);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowOffcanvas(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await addCartItems(cartItems);
      await logoutUser();
      dispatch(clearCart());
      dispatch(removeUser());
      
      window.history.pushState(null, "", "/login");
      window.history.pushState(null, "", "/login");
      window.history.go(-1);
      
      toast.success("Session expired. Please login again.", {
        onClose: () => navigate('/login', { replace: true }) // Using replace to prevent back navigation
      });
      // navigate('/login');
    } catch (error) {
      window.history.pushState(null, "", "/login");
      window.history.pushState(null, "", "/login");
      window.history.go(-1);
  
      toast.error("Error occurred or session expired, Redirecting to login page.", {
        onClose: () => navigate('/login', { replace: true }) // Using replace to prevent back navigation
      });
    }
  };

  const alternativeHomePath = user && user.isAdmin
    ? (location.pathname === "/adminhomepage" ? "/" : "/adminhomepage")
    : "/";

  const handleLinkClick = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" ref={navRef}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
            <img
              src={vgsc}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
              }}
              alt="VGS Logo"
            />
            VGS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggleOffcanvas}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${showOffcanvas ? 'show' : ''}`} id="navbarScroll">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-around align-items-center mx-5">
              <li className="nav-item me-3">
                <Link className="nav-link active" aria-current="page" to={alternativeHomePath} onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown me-3">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {name ? (
                    <span>{name}</span>
                  ) : (
                    <>
                      <Link to='/login' style={{ textDecoration: "none" }} onClick={handleLinkClick}><i className="bi bi-person-circle"></i> <span>Login</span></Link>
                    </>
                  )}
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile" onClick={handleLinkClick}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile" onClick={handleLinkClick}>
                      Me
                    </Link>
                  </li>
                </ul>
              </li>
              {!showNavItems && (
                <li className="nav-item me-3">
                  <button
                    type="button"
                    className="btn btn-white position-relative p-0"
                  >
                    <Link className="dropdown-item" to="/cartpage" onClick={handleLinkClick}>
                      <i className="bi bi-cart4 fs-4"></i> Cart
                    </Link>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-white">
                      {cart.cartItems.length || 0}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="btn btn-white position-relative p-0"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right fs-4 me-1"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Header;
