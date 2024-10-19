import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../Components/AdminNavbar';

function SuperAdminHome() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/");
    }
    else {
      if (localStorage.getItem('type') != 'admin') {
        navigate("/instructordashboard");
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    navigate("/");
  }

  return (
    <>
      <AdminNavbar />
      <button className='btn btn-danger' onClick={logout}>LogOut</button>
    </>
  )
}

export default SuperAdminHome