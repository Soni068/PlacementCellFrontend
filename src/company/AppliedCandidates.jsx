import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CompanyLayout from './CompanyLayout'
import CompanySidebar from './CompanySidebar'
import './AppliedCandidates.css'
const AppliedCandidates = () => {

    const { jobId } = useParams(); 
  const [candidates, setCandidates] = useState([]);
  const userId = localStorage.getItem('userId'); 
  const [jobTitle, setJobTitle] = useState('');
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/applied/by-job/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setCandidates(data);
        } else {
          console.error('Failed to fetch candidates');
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [jobId]);

  useEffect(() => {
    const fetchJobTitle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/job/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJobTitle(data.title);
        } else {
          console.error('Failed to fetch job title');
        }
      } catch (error) {
        console.error('Error fetching job title:', error);
      }
    };
  
    fetchJobTitle();
  }, [jobId]);

  return (
    <CompanyLayout>
        <CompanySidebar />
        <div className="applied-candidates-container" >
        <div className='applied-candidates-1'><h4>Applied Candidates for {jobTitle} Job </h4></div>
        {candidates.length === 0 ? (
          <p>No candidates have applied yet.</p>
        ) : (
          <table className="candidates-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{userId}</td>
                  <td>{candidate.student.name}</td>
                  <td>{candidate.student.email}</td>
                  <td>{candidate.student.course}</td>

                  <td>
                    <a href={`http://localhost:8080/api/student/uploads/Resumes/${candidate.student.resumePath}`} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
        
        </CompanyLayout>
  )
}

export default AppliedCandidates