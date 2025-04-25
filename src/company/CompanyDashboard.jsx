import React from 'react'
import CompanyHeader from './CompanyHeader'
import CompanyLayout from './CompanyLayout'
import CompanySidebar from './CompanySidebar'

const CompanyDashboard = () => {
  return (
      <CompanyLayout>
        <CompanySidebar/>
        <div className="content">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <h1>Welcome, Recruiter!</h1>
          <p>Manage job postings, view applications, and track hiring progress.</p>
        </header>

        {/* Dashboard Main Content */}
        <main className="dashboard-main">
          <div className="stats-container">
            <div className="stat-card">
              <h2>0</h2>
              <p>Total Students</p>
            </div>
            <div className="stat-card">
              <h2>25</h2>
              <p>Active Applications</p>
            </div>
            <div className="stat-card">
              <h2>3</h2>
              <p>Students Applied</p>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Activities</h2>
            <ul>
              <li>📢 Posted a new job: Frontend Developer</li>
              <li>✅ Shortlisted 5 candidates for XYZ Role</li>
              <li>🕒 Interview scheduled on 8 April 2025 for xyz role</li>
            </ul>
          </div>
        </main>
      </div>
    
        </CompanyLayout>

  )
}

export default CompanyDashboard