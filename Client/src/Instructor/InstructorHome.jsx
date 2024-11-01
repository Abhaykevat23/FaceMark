import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/esm/Table';


function InstructorHome() {

  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [tempData, setTempData] = useState();

  const displayColumns = [
    { key: "student_name", label: "Student Name" },
    { key: "roll_number", label: "Roll Number" },
    { key: "enrollment_number", label: "Enrollment Number" },
  ];

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

      const flattenedArray = data.data.flat();
      // console.log(flattenedArray);
      setTempData(flattenedArray);

      if(data){
        getPresentStudents();
      }

    } catch (error) {
      console.error(error);
    }
  };
  //=============================== get Present Students full data ================================

  const getPresentStudents = async () => {
    const response = await fetch("http://localhost:5000/api/managestudent/getpresentstudents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({tempData}),
    });
    const data = await response.json();
    // console.log("last Data..........."+ data);
    setAttendanceData(data);
  }

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
          <div className="display_attendance border-gray border-2 h-[80vh] w-[45vw] m-2 overflow-scroll">
            <Table responsive className='text-center'>
              <thead>
                <tr>
                  <th>Sr.No</th>
                  {displayColumns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {displayColumns.map((column) => (
                      <td key={column.key}> {student[column.key]} </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default InstructorHome