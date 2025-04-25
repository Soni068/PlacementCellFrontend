import React from 'react'
import "./Dashboard.css"
const Sidebar = () => {
  return (
    <div class="sidebar">
        
        <h2>Welcome Admin</h2><hr/>
        
   <ul>
     <li><a href="/placement/Students">Students</a></li>
     <li><a href="/placement/Recruiters">Recruiters</a></li>
     <li><a href="/placement/AdminSetting">Settings</a></li>
     <li><a href="/placement/ContactUs">Contact Us</a></li>
   </ul>
       
       
        
   </div>
  )
}

export default Sidebar