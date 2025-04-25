import React from 'react'
import PlacementHeader from './PlacementHeader'
import FooterComponent from '../components/FooterComponent'
import Students from './Students'
import './Dashboard.css'
import Layout from './Layout'
import Sidebar from './Sidebar'
const Dashboard = () => {
  return (
    <Layout>
     <Sidebar />
     <div className="content">
        {/* Dashboard Header */}
        <header className="dashboard-header">
          <h1>Welcome, Admin!</h1>
          <p>Manage students, recruiters, and oversee the placement process.</p>
        </header>

        {/* Dashboard Main Content */}
        <main className="dashboard-main">
          <div className="stats-container">
            <div className="stat-card">
              <h2>150</h2>
              <p>Total Students</p>
            </div>
            <div className="stat-card">
              <h2>25</h2>
              <p>Registered Recruiters</p>
            </div>
            <div className="stat-card">
              <h2>30</h2>
              <p>Active Job Postings</p>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Activities</h2>
            <ul>
              <li>✅ New student registered: John Doe</li>
              <li>✅ ABC Ltd. posted a new job opening</li>
              <li>⏳ Pending job approval for XYZ Corp.</li>
            </ul>
          </div>
        </main>
      </div>
    </Layout>

  )
}

export default Dashboard