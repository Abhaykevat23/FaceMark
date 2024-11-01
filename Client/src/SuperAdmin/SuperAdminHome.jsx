import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/esm/ToastContainer';
import Toast from 'react-bootstrap/Toast';

function SuperAdminHome() {

  const navigate = useNavigate();
  const [show, setShow] = useState(true);
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

  return (
    <>
      <div className='container'>
      <div className='position-relative'>
          <ToastContainer position="top-end" className="p-3 z-10" >
            <Toast
              onClose={() => setShow(false)} show={show} delay={3000} autohide
              bg='success'
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Hello Admin</strong>
                <small>Just Now</small>
              </Toast.Header>
              <Toast.Body className='text-white'>Logged In SuccessFully</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>


      </div>
    </>
  )
}

export default SuperAdminHome