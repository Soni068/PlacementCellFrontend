import React, {useState} from 'react'
import { Layout } from './Layout'
import axios from 'axios'
import './StudentsHome.css'
import { useNavigate } from 'react-router-dom'
import loginBg from './images.png';
const RecruitersHome = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        description: '',
      });
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');

      const navigate = useNavigate();
    const handleRegisterClick = () => {
        setIsRegistering(true); // Set state to true when "Register" is clicked
        setError('');
    setSuccessMessage('');
      };
    
      const handleLoginClick = () => {
        setIsRegistering(false); // Set state to false when "Login" is clicked
        setError('');
    setSuccessMessage('');
      };

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const validateForm = () => {
        const { name, email, password, description } = formData;
        if (isRegistering) {
          if (!name || !email || !password || !description) {
            setError('All fields are required.');
            return false;
          }
    
          if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email is not valid.');
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
          // Send a POST request with the form data
          const response = await axios.post('http://localhost:8080/api/companies/companyRegister', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          // Handle the response from the API
          if (response.status === 200) {
            alert('Your Registration Request has been sent');
          } else {
            setError('Registration Failed');
          }
        } catch (err) {
            console.error('Error:', err.response || err.message);

            if (err.response) {
              // If the error has a response, show the error from the server
              setError(`Error: ${err.response.data.message || err.response.statusText}`);
            } else {
              // If there's no response, show a generic error
              setError('Something went wrong. Please try again.');
            }// Log error for debugging
        }
      };

      const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
          return;
        }
        try {
          const response = await axios.post('http://localhost:8080/api/companies/companyLogin', {
            email: formData.email,
            password: formData.password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          
    
          if (response.status === 200 && response.data.message === "Company login successful!") {
            setSuccessMessage(`${response.data.message}, Welcome ${response.data.name}!`);
      
      // Store the student's name in localStorage or in a React state for the current session
      localStorage.setItem('companyName', response.data.name);
      localStorage.setItem('companyEmail', response.data.email);
             // assuming response contains the student's name
           
            navigate('company/CompanyDashboard');
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
                <img src={loginBg} alt="Login Background" className="login-imag" />
                
                <div className="image-text">Welcome Recruiters! <br/> Find the best talent here.</div>
   

              </div>
    <div className="form-container-1">
          <h2>{isRegistering ? 'Register Form' : 'Login Form'}</h2>
          <form onSubmit={isRegistering ? handleSubmit : handleLoginSubmit}>
            {isRegistering && (
              <div>
                <label htmlFor="name">Company Name<span style={{color:'red'}}>*</span></label>
                <input type="text" id="name" name="name" value={formData.name}
                  onChange={handleChange} required />
              </div>
            )}

            <div>
              <label htmlFor="email">Email Id:<span style={{color:'red'}}>*</span></label>
              <input type="email" id="email" name="email"  value={formData.email}
                onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password">Password:<span style={{color:'red'}}>*</span></label>
              <input type="password" id="password" name="password" value={formData.password}
                onChange={handleChange} required />
            </div>

            {isRegistering && (
              <div>
                <label htmlFor="description">Description:<span style={{color:'red'}}>*</span></label>
                <input type="text" id="description" name="description"  value={formData.description}
                  onChange={handleChange} required />
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
                <a href="/ForgotPassword/companies">Forgot Password</a><br/><br/>
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

export default RecruitersHome