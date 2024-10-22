import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function AddNewStudent() {
  return (
    <>
      <div className="container">
        <h1 className='text-2xl font-bold text-center'>Add Student</h1>
        <div className="w-[50%] mt-3 text-center ml-[20%]">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="email@example.com" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formFile" className="mb-3">
              <Form.Label column sm="2" >
                File Input
              </Form.Label>
              <Col sm="10">
                <Form.Control type="file" />
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddNewStudent