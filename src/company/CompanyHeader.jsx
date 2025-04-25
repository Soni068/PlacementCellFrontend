import React from 'react'
import './CompanyHeader.css'
import logo from './bv-logo.png';
import { useNavigate } from 'react-router-dom';
const CompanyHeader = () => {
    const navigate = useNavigate();
    const handleLogout = (e) =>{
        e.preventDefault();

        // Use the confirm function to show a confirmation dialog
        const userConfirmed = window.confirm("Are you sure you want to log out?");
    
        // If the user clicks "OK", perform the logout
        if (userConfirmed) {

          localStorage.removeItem('companyName');
        navigate('/');
          
        } else {
          console.log("Logout canceled");
        }

        

    };

  return (
    <div>
    <header>
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="App-logo" href="#"><img src={logo} alt="Logo"/></a>
    
            
            <div className="navbar-links">
                <ul>
                    <li><a href="/RecruitersHome/company/CompanyDashboard">Dashboard</a></li>
                    <li><a href="#">Notifications</a></li>
                    <li><a href="/RecruitersHome/company/CompanyProfile">Profile</a></li>
                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
            </nav>
        </div>
    </header>
    
</div>
  )
}

export default CompanyHeader