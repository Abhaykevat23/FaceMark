import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function AddInstructor() {

  const [inputData, setInputData] = useState({ email: "", password: "", user_type: "", class: "", name: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/manageuser/addinstructor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputData.email, password: inputData.password, user_type: "instructor", class: inputData.class, name: inputData.name })
      // Manually written instructor....there is only instructor to add . so....
    });
    const json = await response.json();
    console.log(json);
  }

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }



  return (
    <>
      <div className="container">
        <h1 className='text-2xl font-bold text-center'>Add Instructor</h1>
        <div className="w-[50%] mt-3 text-right ml-[20%]">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" >
              <Form.Label column sm="2">
                Instructor Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type='text' name='name' value={inputData.name} onChange={onChange} placeholder="Alex Martin" />
              </Col>
            </Form.Group>

            <Form.Select as={Row} name='class' sm="10" value={inputData.class} onChange={onChange} className="mb-3 w-[50%] ml-[17%]" aria-label="Default select example">
              <option value="" >Select Class</option>
              <option value="MCA">MCA</option>
              <option value="MCA-2">MCA-2</option>
              <option value="BCA">BCA</option>
              <option value="BCA-2">BCA-2</option>
              <option value="BCA-3">BCA-3</option>
            </Form.Select>

            {/* <Form.Select as={Row} name='user_type' sm="10" value={inputData.user_type} onChange={onChange} className="mb-3 w-[50%] ml-[17%]" aria-label="Default select example">
              <option value="" >Select User</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
            </Form.Select> */}

            <Form.Group as={Row} className="mb-3" >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="email" name='email' value={inputData.email} onChange={onChange} placeholder="alex@gmail.com" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" >
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" name='password' value={inputData.password} onChange={onChange} placeholder="Password" />
              </Col>
            </Form.Group>

            <Button as="input" type="submit" value="Submit" />
          </Form>
          {/*   Admin can give access of class teacher */}
        </div>
      </div>
    </>
  )
}

export default AddInstructor