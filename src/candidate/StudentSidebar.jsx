import React from 'react'
import './StudentSidebar.css'
import axios from 'axios';

const StudentSidebar = () => {
   

  const userName = localStorage.getItem('userName');
  
    return (
    <div className="sidebar">
        
       
      <br/>  <h4 align={'center'}>Welcome {userName}</h4>
        
   <ul>
     <li><a href="/candidate/AddDetails">Add Details</a></li>
     <li><a href="/candidate/Recruiters">Recruiters</a></li>
     <li><a href='/candidate/JobApplications'>Job Applications</a></li>
     <li><a href="/candidate/StudentSetting">Settings</a></li>

     <li><a href="/candidate/ContactUs">Contact Us</a></li>
   </ul>
       
      <br/><br/> <br/><br/><br/><br/>
        
   </div>
  )
}

export default StudentSidebar