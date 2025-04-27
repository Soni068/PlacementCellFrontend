import React from 'react';
import { Link } from 'react-router-dom';
import CompanyLayout from './CompanyLayout';
import CompanySidebar from './CompanySidebar';

const CompanySetting = () => {
  return (
    <CompanyLayout>
      <CompanySidebar />
      <div className="right-content" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <Link to="/company/change-password">Change Password</Link><hr />
        {/* <a href="#">Add Recruiter</a><hr />
        <a href="#">View Recruiters</a> */}
      </div>
    </CompanyLayout>
  );
};

export default CompanySetting;

