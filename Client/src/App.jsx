import { useEffect, useState } from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Login from './Common Pages/Login';

import SuperAdminHome from './SuperAdmin/SuperAdminHome';
import InstructorHome from './Instructor/InstructorHome';

import InstructorNavbar from './Components/InstructorNavbar';
import AdminNavbar from './Components/AdminNavbar';
// import CommonFooter from './Components/CommonFooter';

import AddNewStudent from './Instructor/Manage Student/AddNewStudent';
import DisplayAttendance from './Instructor/Manage Attendance/DisplayAttendance';

import AddInstructor from './SuperAdmin/Manage Instructor/AddInstructor';
import DisplayStudents from './Instructor/Manage Student/DisplayStudents';

import { SearchProvider } from './SearchContext';

function App() {
  const [admin, setAdmin] = useState(false);
  const [instructor, setInstructor] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('type') == 'instructor') {
      setInstructor(true)
    } else if (localStorage.getItem('type') == 'admin') {
      setAdmin(true)
    }
  }, [])

  return (
    <>
      <Router>
        <SearchProvider>
          {instructor && <InstructorNavbar />}
          {admin && <AdminNavbar />}
          <Routes>
            <Route path="/" element={<Login />} />
            {
              instructor && <>
                <Route path="/instructordashboard" element={<InstructorHome />} />
                <Route path="/displayattendance" element={<DisplayAttendance />} />
                <Route path="/addnewstudent" element={<AddNewStudent />} />
                <Route path="/displaystudents" element={<DisplayStudents />} />
              </>
            }
            {
              admin && <>
                <Route path="/addnewinstructor" element={<AddInstructor />} />
                <Route path="/admindashboard" element={<SuperAdminHome />} />
              </>
            }
          </Routes>
          {/* <CommonFooter /> */}
        </SearchProvider>
      </Router>
    </>
  )
}

export default App
