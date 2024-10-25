import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function AddNewStudent() {
  return (
    <>
      <div className="container">
        <h1 className='text-2xl font-bold text-center'>Add Student</h1>
        <div className="w-[50%] mt-3 text-right ml-[20%]">
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
              <Form.Label column sm="2">
                Student Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type='text' placeholder="Alex Martin" />
              </Col>
            </Form.Group>

            <Form.Select as={Row} sm="10" className="mb-3 w-[50%] ml-[17%]" aria-label="Default select example">
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
                <Form.Control type="text" placeholder="26" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
              <Form.Label column sm="2">
                Enroll Number
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="SOS23*****" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formFile" className="mb-3">
              <Form.Label column sm="2" >
                Student Image 
              </Form.Label>
              <Col sm="10">
                <Form.Control type="file" />
              </Col>
            </Form.Group>
          </Form>
          {/*   Admin can give access of class teacher */}
        </div>
      </div>
    </>
  )
}

export default AddNewStudent