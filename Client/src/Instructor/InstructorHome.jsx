import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import InstructorNavbar from '../Components/InstructorNavbar'

function InstructorHome() {

  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/");
    } else {
      if (localStorage.getItem('type') != 'instructor') {
        navigate("/admindashboard");
      } else {
        //show popUp Of login success
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    navigate("/");
  }

  const take = () => {
    alert("Upload Image")
    // https://dev.to/ondiek/sending-data-from-react-to-flask-apm
  }

  // ===========================================================

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };
  const handleSubmit = async () => {
    if (!image) {
      alert('Please select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://127.0.0.1:5000/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.status != 200) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle the response from the Python script
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <InstructorNavbar />
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
              <strong className="me-auto">Hello Instructor</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>Logged In SuccessFully</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      <br />
      <button className='btn btn-danger' onClick={logout}>LogOut</button>
      <button className='btn btn-success ml-3' onClick={take}>Upload Attendance Photo</button>
      <p>==========================================================================</p>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <button onClick={handleSubmit}>Upload Image</button>
      </div>

    </>
  )
}

export default InstructorHome