import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for React Router v6
import './JobDetails.css'; // You can define your own styles here
import CandidateLayout from './CandidateLayout';
import StudentSidebar from './StudentSidebar';

const JobDetails = () => {
  
    const { jobId } = useParams(); // Get jobId from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [deadlinePassed, setDeadlinePassed] = useState(false);
  const studentId = localStorage.getItem('userId');

  // Fetch job details when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/jobs/jobDetails/${jobId}`)
      .then((response) => {
        const job = response.data;
        setJobDetails(job);
        setLoading(false);

        // Check deadline
        const today = new Date();
        const jobDeadline = new Date(job.deadline);
        setDeadlinePassed(jobDeadline < today); // deadline has passed
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
        setLoading(false);
      });
  }, [jobId]);

  useEffect(() => {
    if (studentId && jobId) {
      axios.get(`http://localhost:8080/api/applied/check`, {
        params: { studentId, jobId }
      })
      .then(res => {
        setApplied(res.data); // true or false
      })
      .catch(err => {
        console.error("Error checking if already applied", err);
      });
    }
  }, [studentId, jobId]);
  

  const handleApply = () => {
    axios
      .post(`http://localhost:8080/api/applied/apply`, null, {
        params: {
          studentId: studentId,
          jobId: jobId,
        },
      })
      .then((response) => {
        console.log('Applied successfully:', response.data);
        alert('You have successfully applied to this job!'); 
        setApplied(true); // ✅ Change button state to "Applied"
      })
      .catch((error) => {
        console.error('Error while applying:', error);
      });
  };

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (!jobDetails) {
    return <div>Job details not found.</div>;
  }

  return (
    <CandidateLayout>
        <StudentSidebar />
   
        <div className="job-details-container">
        <h2>{jobDetails.title}</h2>
        <h2><strong>Company:</strong> {jobDetails.company?.name || 'Not Available'}</h2>
        <p><strong>Job Location:</strong> {jobDetails.location || 'Not Available'}</p>
        <p><strong>Job Description:</strong> {jobDetails.description || 'Not Available'}</p>
        <p><strong>Salary:</strong> {jobDetails.salary || 'Not Available'}</p>
        <p><strong>Job Type:</strong> {jobDetails.type || 'Not Available'}</p>
        <p><strong>Skills Required:</strong> {jobDetails.skills || 'Not Available'}</p>
        <p><strong>Eligibility (CGPA):</strong> UG: {jobDetails.ugCgpa || 'Not Available'} | PG: {jobDetails.pgCgpa || 'Not Available'}</p>
        <p><strong>Qualifications:</strong></p>
        <ul>
          {(jobDetails.courses || []).map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
        <p><strong>Application Deadline:</strong> {jobDetails.deadline || 'Not Available'}</p>
        {deadlinePassed ? (
          <p className="deadline-message" style={{ color: 'red', fontWeight: 'bold' }}>
            This job is no longer accepting responses.
          </p>
        ) : (
          <p><strong>How to apply:</strong> Click here{' '}
            <a href={jobDetails.companyWebsite} target="_blank" rel="noopener noreferrer">
              {jobDetails.companyWebsite || 'Not Available'}
            </a>
          </p>
        )}

        <button
          className="job-button"
          onClick={handleApply}
          disabled={applied || deadlinePassed}
        >
          {applied ? 'Applied' : deadlinePassed ? 'Closed' : 'Apply'}
        </button>

        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </CandidateLayout>
  )
}


export default JobDetails;
