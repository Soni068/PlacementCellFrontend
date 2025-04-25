import React from 'react'
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'
const StudentDashboard = () => {
    
  
  return (
    <CandidateLayout>
      
    <StudentSidebar />
    
    <div className="content">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <h1>Welcome, Student!</h1>
          <p>Manage your applications, view job postings, and track your progress.</p>
        </header>

        {/* Dashboard Main Content */}
        <main className="dashboard-main">
          <div className="stats-container">
            <div className="stat-card">
              <h2>5</h2>
              <p>Total Applications</p>
            </div>
            <div className="stat-card">
              <h2>80%</h2>
              <p>Profile Completion</p>
            </div>
            <div className="stat-card">
              <h2>2</h2>
              <p>Upcoming Interviews</p>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Activities</h2>
            <ul>
              <li>✅ Applied for XYZ Company - Software Engineer</li>
              {/* <li>✅ Updated Resume</li> */}
              <li>⏳ Awaiting Interview Call from ABC Ltd.</li>
            </ul>
          </div>
        </main>
      </div>
    
    </CandidateLayout>
  )
}

export default StudentDashboard