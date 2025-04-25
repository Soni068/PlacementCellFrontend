import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import Sidebar from './Sidebar'
import './Students.css'
import './Recruiters.css'
const Recruiters = () => {
  const [jobCount, setJobCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      // Replace with your API endpoint for fetching job count
      fetch('http://localhost:8080/api/jobs/admin') // Assuming this endpoint returns all jobs
          .then(response => response.json())
          .then(data => {
              setJobCount(data.length); // Set the job count
          })
          .catch(error => console.error('Error fetching jobs:', error));
  }, []);

    const handleRequestedRecruitersClick = () => {
      navigate('/placement/RequestedRecruiters');  
    };

    const handleRecruitersListClick = () => {
        navigate('/placement/RecruitersList');
    };

    const handlePostedJobsClick = () => {
      navigate('/placement/PostedJobsAdmin');
  };
  return (
    <Layout>
        <Sidebar />
        <div className="dashboard-container">
              
              <button className="btn-1" type="submit" onClick={handleRequestedRecruitersClick} >Requested Recruiters</button>
         
              <button className="btn-2" type="submit" onClick={handleRecruitersListClick}>All Recruiters</button>
              <div className="job-posts-button-container">
              <button className="btn-3" type="submit" onClick={handlePostedJobsClick}>Job posts</button>
              {jobCount > 0 && (
                        <div className="job-count-circle">
                            {jobCount}
                            </div>
                    )}
                    </div>
       </div>
    </Layout>
  )
}

export default Recruiters