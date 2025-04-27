import React from 'react';
import './CompanySidebar.css';

const CompanySidebar = () => {
  const companyName = localStorage.getItem('companyName');

  return (
    <div className="sidebar">
      <h4 style={{ textAlign: 'center' }}>Welcome {companyName || 'Recruiter'}</h4>

      <ul>
        {/* <li><a href="#">Students</a></li> */}
        <li><a href="/company/postjobs">Post Jobs</a></li>
        <li><a href="/company/postedjobs">Posted Jobs</a></li>
        <li><a href="/company/CompanySetting">Settings</a></li>
        <li><a href="/company/CompanyContact">Contact Us</a></li>
      </ul>
    </div>
  );
};

export default CompanySidebar;
