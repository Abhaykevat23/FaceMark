import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './Common Pages/Login';
import SuperAdminHome from './SuperAdmin/SuperAdminHome';
import InstructorHome from './Instructor/InstructorHome';

function App() {

  return (
    <>
      <Router>
        <div className='container m-0 p-0'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admindashboard" element={<SuperAdminHome />} />
            <Route path="/instructordashboard" element={<InstructorHome />} />
            
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
