import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {


    useEffect(() => {
        if (localStorage.getItem('type') == 'instructor') {
            navigate("/instructordashboard");
        } else if (localStorage.getItem('type') == 'admin') {
            navigate("/admindashboard");
        }

    }, [])

    const [Credentials, setCredentials] = useState({ email: "", password: ""});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Credentials.email, password: Credentials.password })
        });
        const json = await response.json();
        console.log(json);
        
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('type', json.user_type);
            // props.showAlert("Loged-In Successfully","success");

            if (json.user_type == "instructor") {
                localStorage.setItem('class',json.class);
                navigate("/instructordashboard");
                window.location.reload();
            } else if (json.user_type == "admin") {
                navigate("/admindashboard");
                window.location.reload();
            } else {
                navigate("/");
            }
        } else {
            // props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' value={Credentials.email} onChange={onChange} placeholder="name@example.com" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" name='password' value={Credentials.password} onChange={onChange} required />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="user_type" className="form-label">Select User</label><br />
                    <select name='user_type' className='text-black w-40' value={Credentials.user_type} onChange={onChange} >
                        <option value="">Select</option>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </div> */}
                <button type="submit" className="btn btn-primary mb-3 w-[10%]" >Log-in</button>
            </form>
        </div>
    )
}

export default Login