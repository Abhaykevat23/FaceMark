import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchContext from '../SearchContext';


function InstructorNavbar() {
    const navigate = useNavigate();
    const { setSearchTerm } = useContext(SearchContext);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        localStorage.removeItem('class');
        navigate("/");
        window.location.reload();
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand><Link to={'/instructordashboard'}>PCET's PCU</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link><Link to="/attendance"> Attendance </Link></Nav.Link> */}
                            <NavDropdown title="Attendance" id="basic-nav-dropdown" className='ml-5'>
                                <NavDropdown.Item><Link to="/displayattendance"> Display Attendance </Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/updateattendance"> Update Attendance </Link></NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Student" id="basic-nav-dropdown" className='ml-5'>
                                <NavDropdown.Item><Link to="/displaystudents"> Display Student </Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/addnewstudent"> Add Student </Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Form className="d-flex mr-[5%] w-[30%]">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleSearch}
                            />
                        </Form>
                        <Nav.Link><button className='btn btn-danger' onClick={logout}>LogOut</button></Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default InstructorNavbar