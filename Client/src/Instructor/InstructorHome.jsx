import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';


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

      }
    }
  }, [])

  // =========================== Image Upload ================================

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
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
    } catch (error) {
      console.error(error);
    }
  };

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
                <strong className="me-auto">Hello Instructor</strong>
                <small>Just Now</small>
              </Toast.Header>
              <Toast.Body className='text-white'>Logged In SuccessFully</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>


        <div className="dashboard_container flex justify-center align-middle">
          <div className="image_container border-gray border-2 h-[80vh] w-[45vw] m-2 ">
            <div className='image_upload p-3 ml-4 text-center'>
              <input type="file" accept=".jpg" onChange={handleImageChange} ref={fileInputRef} />
              <button className='btn btn-success ml-3' onClick={handleSubmit}>Upload Image</button>
            </div>
            <div className="display_image p-3 ml-4 h-[50%] w-[90%] ">
              {previewUrl && (
                <div className='image_preview mt-3'>
                  <img src={previewUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
              )}
            </div>
          </div>
          <div className="display_attendance border-gray border-2 h-[80vh] w-[45vw] m-2">
              

          </div>
        </div>
      </div>
    </>
  )
}

export default InstructorHome