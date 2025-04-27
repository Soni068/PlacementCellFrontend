import React from 'react';
import { Link } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import CandidateLayout from './CandidateLayout'; // assuming you have a layout like CompanyLayout

const StudentSetting = () => {
  return (
    <CandidateLayout>
      <StudentSidebar />
      <div className="right-content" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <a href="/candidate/change-password">Change Password</a><hr />
        {/* Future: Add Preferences, Privacy Settings, etc. */}
      </div>
    </CandidateLayout>
  );
};

export default StudentSetting;
