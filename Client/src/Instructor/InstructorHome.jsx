import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/esm/Table';
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function InstructorHome() {

  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [tempData, setTempData] = useState();
  const [loading, setLoading] = useState(false);

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

    //Attendance Loader
    setLoading(true);

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

      if (flattenedArray) {
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
      body: JSON.stringify({ tempData }),
    });
    const data = await response.json();
    // console.log("last Data..........."+ data);
    setLoading(false);
    setAttendanceData(data);
  }

  //=============================== Store Attendance =====================================
  const [inputData, setInputData] = useState({ stud_name: "", stud_class: "", roll_no: "", enrollment_no: "" });

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("stud_name", inputData.stud_name);
    // formData.append("stud_class", localStorage.getItem('class'));
    // formData.append("roll_no", inputData.roll_no);
    // formData.append("enrollment_no", inputData.enrollment_no);
    // formData.append("stud_image", file);

    // const response = await fetch("http://localhost:5000/api/managestudent/addstudent", {
    //   method: "POST",
    //   body: formData,
    // });
    // const json = await response.json();
    // console.log(json);
  }

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
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

        <div className="dashboard_container flex justify-center">
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
          <div className="display_attendance relative border-gray border-2 h-[80vh] w-[45vw] m-2 overflow-scroll">
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
                {loading ? (
                  <div className=' absolute mt-[30%] ml-[40%]'>
                    <Spinner animation="border" className="" variant="success" />
                    <div className="loader text-center text-3xl">Loading...</div>
                  </div>
                ) : (
                  attendanceData.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {displayColumns.map((column) => (
                        <td key={column.key}> {student[column.key]} </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="store_attendance mt-4">
          <h1 className='text-3xl font-bold text-center'>Store Attendance</h1>
          <div className="store_form w-[50%] mt-3 text-right ml-[20%]">
            <Form onSubmit={handleAttendanceSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="2">
                  Student Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control type='text' name='stud_name' value={inputData.stud_name} onChange={onChange} placeholder="Alex Martin" />
                </Col>
              </Form.Group>

              {/* <Form.Select as={Row} name='stud_class' sm="10" value={inputData.stud_class} onChange={onChange} className="mb-3 w-[50%] ml-[17%]" aria-label="Default select example" >
              <option>Select Class</option>
              <option value="MCA">MCA</option>
              <option value="MCA-2">MCA-2</option>
              <option value="BCA">BCA</option>
              <option value="BCA-2">BCA-2</option>
              <option value="BCA-3">BCA-3</option>
            </Form.Select> */}

            {/* we need class to store attendance in specific class............ */}

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="2">
                  Roll Number
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="number" name='roll_no' value={inputData.roll_no} onChange={onChange} placeholder="26" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
                <Form.Label column sm="2">
                  Enroll Number
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" name='enrollment_no' value={inputData.enrollment_no} onChange={onChange} placeholder="SOS23*****" />
                </Col>
              </Form.Group>

              <Button as="input" type="submit" value="Submit" />
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default InstructorHome