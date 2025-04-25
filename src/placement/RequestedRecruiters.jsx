import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import Sidebar from './Sidebar'
import axios from 'axios'
import './StudentsList.css'
const RequestedRecruiters = () => {
    const [company, setCompany] = useState([]);

  // State to handle loading state
  const [loading, setLoading] = useState(true);

  // State to handle any errors during the fetch
  const [error, setError] = useState(null);

  // Fetch data from API when the component is mounted
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await axios.get('http://localhost:8080/api/companies/pending');
        setCompany(response.data);  // Assuming your API returns an array of students
        setLoading(false);
      } catch (error) {
        setError('Error fetching students');
        setLoading(false);
      }
    };

    fetchCompany();
  }, []); // Empty dependency array ensures it runs only once after the initial render

  const handleAccept = async (companyName) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/companies/approve/${companyName}`, {
        status: 'ACCEPTED',
      });
      // After accepting, you can either update local state or re-fetch the data
      setCompany(company.map(c => c.name === companyName ? { ...c, status: 'ACCEPTED' } : c));
      alert('Company accepted successfully');
    } catch (error) {
      console.error('Error accepting company', error);
      alert('Error accepting company');
    }
  };

  // Handle Reject button
  const handleReject = async (companyName) => {
    try {
      await axios.delete(`http://localhost:8080/api/companies/reject/${companyName}`);
      // Remove company from local state after successful deletion
      setCompany(company.filter(c => c.name !== companyName));
      alert('Company rejected and deleted successfully');
    } catch (error) {
      console.error('Error rejecting company', error);
      alert('Error rejecting company');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

    
  return (
    <Layout>
        <Sidebar/>
        <div>
      <br/> <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} align={'center'}> Recruiters</h3>
        <table border={2} align={'center'}>
          <thead style={{backgroundColor:'#4a8dc7'}}>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Description</th>
             <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {company.map((company) => (
              <tr key={company.name}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.description}</td>
                <td><button className='action-btn' onClick={() => handleAccept(company.name)}>Accept</button>
                <button className='action-btn2' onClick={() => handleReject(company.name)}>Reject</button></td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    
    </Layout>
  );
}

export default RequestedRecruiters