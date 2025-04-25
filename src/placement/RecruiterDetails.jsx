import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import Sidebar from './Sidebar';

const RecruiterDetails = () => {

    const { name } = useParams();
  const [recruiter, setRecruiter] = useState(null);

  useEffect(() => {
    const fetchRecruiter = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/companies/${name}`);
        setRecruiter(response.data);
      } catch (error) {
        console.error('Error fetching recruiter details:', error);
      }
    };

    fetchRecruiter();
  }, [name]);

  if (!recruiter) return <div>Loading recruiter details...</div>;


  return (
    <Layout>
        <Sidebar />
        <div style={{ padding: '20px' }}>
      <h2>Recruiter Details</h2>
      <p><strong>Name:</strong> {recruiter.name}</p>
      <p><strong>Email:</strong> {recruiter.email}</p>
      <p><strong>Description:</strong> {recruiter.description}</p>
      {/* Add other fields from your API */}
    </div>
        </Layout>
  )
}

export default RecruiterDetails