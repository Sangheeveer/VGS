import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {toast} from 'react-toastify';

const AdminProtectRoutes = () => {
  const user  = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      toast.error("You do not have access to this page.");
    }
  }, [user]);


  return <>{user && user.isAdmin ? <Outlet /> : <Navigate to="/" />}</>;
};

export default AdminProtectRoutes;