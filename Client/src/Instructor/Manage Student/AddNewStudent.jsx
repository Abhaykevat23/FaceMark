import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function AddNewStudent() {

  const [inputData, setInputData] = useState({ stud_name: "", stud_class: "", roll_no: "", enrollment_no: "" });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("stud_name", inputData.stud_name);
    formData.append("stud_class", inputData.stud_class);
    formData.append("roll_no", inputData.roll_no);
    formData.append("enrollment_no", inputData.enrollment_no);
    formData.append("stud_image", file);

    const response = await fetch("http://localhost:5000/api/managestudent/addstudent", {
      method: "POST",
      body: formData,
      // body: JSON.stringify({ stud_name: inputData.stud_name, stud_class: inputData.stud_class, roll_no: inputData.roll_no, enrollment_no: inputData.enrollment_no, stud_image: file })
    });
    const json = await response.json();
    console.log(json);
  }

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  const onImageChange = async (e) => {
    setFile(e.target.files[0]);
  }



  return (
    <>
      <div className="container">
        <h1 className='text-2xl font-bold text-center'>Add Student</h1>
        <div className="w-[50%] mt-3 text-right ml-[20%]">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
              <Form.Label column sm="2">
                Student Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type='text' name='stud_name' value={inputData.stud_name} onChange={onChange} placeholder="Alex Martin" />
              </Col>
            </Form.Group>

            <Form.Select as={Row} name='stud_class' sm="10" value={inputData.stud_class} onChange={onChange} className="mb-3 w-[50%] ml-[17%]" aria-label="Default select example" >
              <option>Select Class</option>
              <option value="MCA">MCA</option>
              <option value="MCA-2">MCA-2</option>
              <option value="BCA">BCA</option>
              <option value="BCA-2">BCA-2</option>
              <option value="BCA-3">BCA-3</option>
            </Form.Select>

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

            <Form.Group as={Row} controlId="formFile" className="mb-3">
              <Form.Label column sm="2" >
                Student Image
              </Form.Label>
              <Col sm="10">
                <Form.Control type="file" name='stud_image' onChange={onImageChange} accept='.jpg' required />
              </Col>
            </Form.Group>
            <Button as="input" type="submit" value="Submit" />
          </Form>
          {/*   Admin can give access of class teacher */}
          {/* https://youtu.be/pfxd7L1kzio */}
        </div>
      </div>
    </>
  )
}

export default AddNewStudent