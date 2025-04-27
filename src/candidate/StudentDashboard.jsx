import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Added axios import
import CandidateLayout from './CandidateLayout';
import StudentSidebar from './StudentSidebar';

const StudentDashboard = () => {

  // Step 2: State to hold the dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalApplications: 0,
    profileCompletion: 0,
    upcomingInterviews: 0,
    recentActivities: []
  });

  // Step 3: Fetch data from backend when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/student/dashboard'); 
        // Replace the URL with your actual backend endpoint
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []); // Empty array = run only once when page loads

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
              <h2>{dashboardData.totalApplications}</h2>
              <p>Total Applications</p>
            </div>
            <div className="stat-card">
              <h2>{dashboardData.profileCompletion}%</h2>
              <p>Profile Completion</p>
            </div>
            <div className="stat-card">
              <h2>{dashboardData.upcomingInterviews}</h2>
              <p>Upcoming Interviews</p>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Recent Activities</h2>
            <ul>
              {dashboardData.recentActivities.length > 0 ? (
                dashboardData.recentActivities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))
              ) : (
                <li>No recent activities</li>
              )}
            </ul>
          </div>
        </main>
      </div>

    </CandidateLayout>
  );
};

export default StudentDashboard;
