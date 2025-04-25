import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JobApplications.css'; 
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'

const JobApplications = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Assuming the student ID is stored in localStorage
  
  // Fetch relevant jobs for the student
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/student/relevantJobs/${userId}`)
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the jobs!", error);
        setLoading(false);
      });
  }, [userId]);

  // Handle the application or view details button click
  /*const handleButtonClick = (jobId, action) => {
    if (action === 'apply') {
      // Redirect to application page (you can create a page for applying to the job)
      window.location.href = `/candidate/applyJob/${jobId}`;
    } else {
      // Redirect to the job details page
      window.location.href = `/candidate/jobDetails/${jobId}`;
    }
  };*/

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <CandidateLayout>
      <StudentSidebar/>
      <div className="job-application-container1">
      <h2 >        &nbsp;  &nbsp; &nbsp;   &nbsp;Job Applications</h2>
      <div className="job-cards-container1">
        {jobs.length === 0 ? (
          <p>No relevant jobs available at the moment.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card1" key={job.id}>
              <h3>{job.title}</h3>
              <p>Company: {job.company.name}</p>
              <p>{job.location}</p>
              <div className="job-card-buttons1">
              
              <Link to={`/jobDetails/${job.id}`}>
                    <button className="details-btn1">See Details</button>
                  </Link>

                 
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  
      </CandidateLayout>
  )
}

export default JobApplications