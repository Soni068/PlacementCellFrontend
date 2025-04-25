import React from 'react'
import './CompanySidebar.css'
const CompanySidebar = () => {
    const companyName = localStorage.getItem('companyName');
  return (
    <div class="sidebar">
        
       
        <h4 align={'center'}>Welcome {companyName}</h4>
        
   <ul>
     {/*<li><a href="#">Students</a></li>*/}
     <li><a href="/company/postjobs">Post Jobs</a></li>
     <li><a href='/company/postedjobs'>Posted Jobs</a></li>
     <li><a href="#">Settings</a></li>
     <li><a href="/company/CompanyContact">Contact Us</a></li>
   </ul>
       
       
        
   </div>
  )
}

export default CompanySidebar