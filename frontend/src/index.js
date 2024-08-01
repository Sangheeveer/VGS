import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './Store';
import {Provider} from 'react-redux';
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route } from 'react-router-dom';
// import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import DetailsOfUser from './pages/DetailsOfUser';
import ForgetPassword from './pages/ForgetPassword';
import Toast from './utils/Toast';
import CategoryPage from './pages/CategoryPage';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage';
import CategoryCreate from './components/common/CategoryCreate';
import ImageUpload from './components/ImageUpload';
import ProductCreate from './components/productCreate';
import AdminHomePage from './components/AdminHomePage';
import CategoryDisplay from './components/categoryDisplay';
import ProductsPage from './components/productsPage';
import AddressPage from './pages/addressPage';
import AddressFormPage from './components/elements/addressFormPage';  
import ProfilePage from './pages/profilePage';
import AdminProtectRoutes from './components/protectRoutes/adminProtectRoutes';
import UserProtectRoutes from './components/protectRoutes/userProtectRoutes';
import PlacingOrderPage from './pages/placingOrderPage';
import OrderFinalPage from './pages/orderFinalPage';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" index={true} element={<CategoryPage/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/DetailsOfUser" element={<DetailsOfUser/>}/>
      <Route path="/resetPassword" element={<ResetPassword/>}/>
      <Route path="/ForgetPassword" element={<ForgetPassword/>}/> 
      <Route path="/toast" element={<Toast/>}/>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="/orderpage" element={<OrderPage/>}/> */}
      <Route path="/orderpage/:quant" element={<OrderPage/>}/>
      <Route path="/cartpage" element={<CartPage/>}/>
      <Route path="" element={<UserProtectRoutes />}>  
      <Route path="/placeorder" element={<PlacingOrderPage/>}/>
      <Route path="/orderfinalpage" element={<OrderFinalPage/>}/>
            <Route path="/profile" element={<ProfilePage />}>
                    <Route path="/profile/resetpassword" element={<ResetPassword/>}/>
                    <Route path="/profile/forgetpassword" element={<ForgetPassword/>}/>
                    <Route path="/profile/addresspage" element={<AddressPage/>}/>

            </Route>
      </Route>
      <Route path="" element={<AdminProtectRoutes/>}>
              
              <Route path="/adminhomepage" element={<AdminHomePage/>}/>
              <Route path="/admin/products/:categoryId" element={<ProductsPage/>}/>
              <Route path="/categorydisplay" element={<CategoryDisplay/>}/>
              <Route path="/categorycreate" element={<CategoryCreate/>}/>
              <Route path="/categorycreate/:id" element={<CategoryCreate/>}/>
              <Route path="/productcreate/:categoryId" element={<ProductCreate/>}/>
              <Route path="/imageupload/:id" element={<ImageUpload/>}/>
      </Route>
      
      {/* <Route path="/addresspage" element={<AddressPage/>}/> */}
      <Route path="/addressformpage" element={<AddressFormPage/>}/>
      {/* <Route path="/profile" element={<ProfilePage/>}/> */}

   </Route>

  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>    
  </React.StrictMode>
);


reportWebVitals();
