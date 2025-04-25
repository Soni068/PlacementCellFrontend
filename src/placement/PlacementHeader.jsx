import React from 'react'
import './PlacementHeader.css'
import logo from './bv-logo.png';
import { useNavigate } from 'react-router-dom';
const PlacementHeader = () => {
    const navigate = useNavigate();
    const handleLogout = (e) =>{
        e.preventDefault();

        // Use the confirm function to show a confirmation dialog
        const userConfirmed = window.confirm("Are you sure you want to log out?");
    
        // If the user clicks "OK", perform the logout
        if (userConfirmed) {
          console.log("Logging out..."); 
          // You can clear session data, redirect, or perform other actions here
          // For example, navigate to the login page
          navigate("/", { replace: true }); // Redirect to login page
        } else {
          console.log("Logout canceled");
        }
    }
  return (
    <div>
        <header>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <a className="App-logo" href="#"><img src={logo} alt="Logo"/></a>
        
                
                <div className="navbar-links">
                    <ul>
                        <li><a href="/OurTeam/placement/Dashboard">Dashboard</a></li>
                        <li><a href="/OurTeam/placement/Feedback">Feedback</a></li>
                        <li><a href="/OurTeam/placement/AdminProfile">Profile</a></li>
                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
                </nav>
            </div>
        </header>
        
    </div>
  )
}

export default PlacementHeader