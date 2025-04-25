import React, { useState, useEffect}from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import './OurTeam.css'
import image from'./prof.jpg'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { Layout } from './Layout';
const OurTeam = () => { const [isFormVisible, setIsFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  const navigate = useNavigate(); 

    // Function to toggle the form visibility
    const toggleForm = () => {
      setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

    try {
      // Send the login request to your backend API
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        email,
        password,
      });

      // Check the response data to show success or failure message
      if (response.data === "Admin login successful!") {
        setMessage("Login successful!");
        localStorage.setItem("adminEmail", email);

        navigate('placement/Dashboard');
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      // If the API call fails
      setMessage("Error logging in. Please try again later.");
    }
  };

    const closeFormOnOverlayClick = (e) => {
        // Only close the form if the overlay itself (not the form) is clicked
        if (e.target.className === 'overlay') {
          setIsFormVisible(false);
        }
      };

      useEffect(() => {
        // Fetch all team members on component mount
        axios.get('http://localhost:8080/api/team/all')
          .then((response) => {
            console.log('All team members:', response.data);
            setTeamMembers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching team members:', error);
          });
      }, []);
    

  return (
    <Layout>
    <div className="our-team-container">

{/* Hero Section */}
<div className="hero-section">
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <h1>Meet Our Team</h1>
    <p>Our dedicated professionals guide students towards successful careers by bridging the gap between education and industry.</p>
  </div>
</div>

{/* Placement and Internship Team Heading with Line Above */}
<div className="team-heading-container">
<h2 className="team-heading">Placement and Internship Team</h2>
<hr className="team-heading-line" />
</div>


 {/* Team Section */}
 <div className="team-grid">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div className="team-member" key={member.team_id}>

<div className="team-member-header">
                {member.tea_imageBase64 && (
                  <img
                    src={`data:image/jpeg;base64,${member.tea_imageBase64}`}
                    alt={member.tea_name}
                    style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                  />
                )}
                <h3 style={{marginLeft: "-80px"}}>{member.tea_name}</h3>
                </div>
               
                <p>📧 {member.tea_email}</p>
                <p>📞 {member.tea_phone}</p>
                <p>{member.tea_post}</p>
              </div>
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </div>

     
{/* Admin Login Button */}
<div className="login-section">
  <button className="login-btn" type="button" onClick={toggleForm}>Admin Login</button>
</div>

{/* Login Form Overlay */}
{isFormVisible && (
  <div className="overlay" onClick={toggleForm}>    
    <div className="form-container" onClick={(e) => e.stopPropagation()}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="text" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        <p>Forgot Password? <a href="/ForgotPassword/admin">Click Here</a></p>
      </form>

      {message && <p style={{ color: message === "Login successful!" ? "green" : "red" }}>{message}</p>}
    </div>
  </div>
)}
</div>
    </Layout>
  );
};

export default OurTeam