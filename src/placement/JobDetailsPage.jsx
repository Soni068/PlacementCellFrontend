import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Layout from './Layout';
import Sidebar from './Sidebar';
import './JobDetailsPage.css'

const JobDetailsPage = () => {
    const { jobId } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  axios.get(`http://localhost:8080/api/jobs/jobDetails/${jobId}`) // Fetch the job details from backend
  .then(response => {
    setJob(response.data);
  })
  .catch(error => {
    setError('Error fetching job details.');
  });
}, [jobId]); 
  return (
    <Layout>
        <Sidebar />
        <div className='job-details-page'>
            <br/>
      

      {/* Error message if there's an issue */}
      {error && <p>{error}</p>}

      {/* Display the job details */}
      {job ? (
        <div>
          <h2><strong>Company:</strong> {job.company?.name || 'Not Available'}</h2>
          <h2> {job.title}</h2>
          <p><strong>Job Description:</strong> {job.description}</p>
          <p><strong>Job Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>How to apply:</strong>Click Here <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">{job.companyWebsite}</a></p>
          <p><strong>Skills Requirement:</strong> {job.skills}</p>
          <p><strong>Qualifications:</strong> {job.courses.join(', ')}</p>
          <p><strong>Eligibility CGPA</strong></p>
          <ul><li>UG: {job.ugCgpa}</li>
         <li> PG: {job.pgCgpa}</li>
          </ul>
          <p><strong>Application Deadline:</strong> {job.deadline}</p>
          
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
        </Layout>
  )
}

export default JobDetailsPage