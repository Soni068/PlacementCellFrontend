import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Layout from './Layout';
import Sidebar from './Sidebar'
import './PostedJobsAdmin.css'

const PostedJobsAdmin = () => {

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 // const history = useHistory(); 
  // Fetch all jobs when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/jobs/admin') // Fetch all jobs from backend
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        setError('Error fetching job listings.');
      });
  }, []);

  // Fetch job details when admin clicks on 'See Details'
 
  /*const handleSeeDetails = (jobId) => {
    history.push(`/placement/JobDetailsPage/${jobId}`); // Navigate to the job details page
  };*/

  const handleSeeDetails = (jobId) => {
    navigate(`/placement/JobDetailsPage/${jobId}`); // Navigate to the job details page with the job ID
  };

  return (
    <Layout>
      <Sidebar/>
      <div className='posted-jobs-list'>
      <h1>Job Listings</h1>
      
      {/* Error message if there's an issue */}
      {error && <p>{error}</p>}
      
      {/* Display the list of jobs in a table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company.name}</td> {/* Assuming job has a 'company' object with 'name' */}
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{job.deadline}</td>
              <td>
                <button onClick={() => handleSeeDetails(job.id)}>See Details</button> {/* Button to view job details */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      
    </div>
      </Layout>
  )
}

export default PostedJobsAdmin