import React, {useState} from 'react'
import {Layout} from './Layout'
import './StudentsHome.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import loginBg from './OIP.jpg'; // Importing the image
const StudentsHome = () => {

  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register forms
  const [formData, setFormData] = useState({
    name: '',
    stud_id: '',
    course: 'null',
    phone: '',
    email: '',
    password: '',
    
    endOfSession: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setIsRegistering(true);
    setError('');
    setSuccessMessage(''); // Set state to true when "Register" is clicked
  };

  const handleLoginClick = () => {
    setIsRegistering(false);
    setError('');
    setSuccessMessage(''); // Set state to false when "Login" is clicked
  };

  const handleChange = (e) => {
    //const{name, value} = e.target
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, stud_id, course, phone, email, password } = formData;
    if (isRegistering) {
      if (!name || !stud_id || course === 'null' || !phone || !email || !password) {
        setError('All fields are required.');
        return false;
      }

      if (!/^[A-Za-z]{5}\d{5}$/.test(stud_id)) {
        setError('Please enter the correct student id.');
        return false;
    }

      if (!/^\d{10}$/.test(phone)) {
        setError('Phone number must be 10 digits.');
        return false;
      }

      if (!/^[a-zA-Z0-9._%+-]+@banasthali\.in$/.test(email)) {
        setError('Email must be in the format @banasthali.in');
        return false;
    }

    // Validate password (at least 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character)
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
        setError('Password must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one number, and one special character.');
        return false;
    }

     
    } else {
      // Login validation
      if (!email || !password) {
        setError('Email and Password are required.');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/student/register', formData, {
        
       headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.status === 201) {
        alert('Registration Successfully');
      } else {
        setError("Registration Failed");
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/student/studentLogin', {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: () => true,
      });

      if (response.status === 403 || response.status === 401) {
        setError(response.data); // data is plain string from backend
        return;
      }
  

      if (response.status === 200 && response.data.message === "Student login successful!") {
        //setSuccessMessage(`${response.data.message}, Welcome ${response.data.name}!, ${response.data.stud_id}`);
        
      // Store the student's name in localStorage or in a React state for the current session
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userId', response.data.stud_id);
      /*localStorage.setItem('userEmail', response.data.email)*/
         // assuming response contains the student's name
        
        navigate('candidate/StudentDashboard');
        setError('');
        // Optionally, you can store token or user info in local storage for authentication persistence
        // localStorage.setItem('authToken', response.data.token);
      } else {
        setError("Login Failed");
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };


  return (
    <Layout>
    <div>
    <div className="image-container">
          <img src={loginBg} alt="Login Background" className="login-image" />
          <div className="image-text">Welcome Student!</div>
        </div>
    <div className="form-container-1">
          <h2>{isRegistering ? 'Register Form' : 'Login Form'}</h2>
          <form onSubmit={isRegistering ? handleSubmit : handleLoginSubmit}>
            {isRegistering && (
              <div>
                <label htmlFor="name">Name<span style={{color:'red'}}>*</span></label>
                <input type="text" id="name" name="name" value={formData.name}
                    onChange={handleChange} required />
              </div>
            )}

{isRegistering && (
              <div>
                <label htmlFor="stud_id">Student Id<span style={{color:'red'}}>*</span></label>
                <input type="text" id="stud_id" name="stud_id" value={formData.stud_id}
                    onChange={handleChange} required />
              </div>
            )}
{isRegistering && (
              <div>
                <label htmlFor="course">Course<span style={{color:'red'}}>*</span></label>
                <select id="course" name="course" value={formData.course}
                    onChange={handleChange} required >
        <option value='null'>Select</option>
        <option value="BCA">BCA</option>
        <option value="Btech">Btech</option>
        <option value="Bsc">Bsc</option>
        <option value="MCA">MCA</option>
        <option value="Mtech">Mtech</option>
        <option value="Msc">Msc</option>
    </select>
              </div>
            )}


{isRegistering && (
              <div>
                <label htmlFor="phone">Phone no.<span style={{color:'red'}}>*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone}
                    onChange={handleChange} required />
              </div>
            )}
            <div>
              <label htmlFor="email">Email Id:<span style={{color:'red'}}>*</span></label>
              <input type="email" id="email" name="email" value={formData.email}
                    onChange={handleChange}  required />
            </div>
            <div>
              <label htmlFor="password">Password:<span style={{color:'red'}}>*</span></label>
              <input type="password" id="password" name="password" value={formData.password}
                    onChange={handleChange} required />
            </div>

            

{isRegistering && (
  <div>
    <label htmlFor="endOfSession">End of Session<span style={{color:'red'}}>*</span></label>
    <input
      type="date"
      id="endOfSession"
      name="endOfSession"
      value={formData.endOfSession}
      onChange={handleChange}
      required
    />
  </div>
)}

            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <h6> {isRegistering ? (
              <span>
                Already have an account? 
                <a href="#" onClick={handleLoginClick}>Login</a>
              </span>
            ) : (
              <span>
                Don't Remember Password?
                <a href="/ForgotPassword/student">Forgot Password</a><br/><br/>
                Don't have an account? 
                <a href="#" onClick={handleRegisterClick}>Register</a>
              </span>
              
            )}</h6>
          </form>


        </div>
    </div><br/><br/><br/>
    </Layout>
  )
}

export default StudentsHome