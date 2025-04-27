import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import axios from 'axios'
import './StudentsList.css'

const RecruitersList = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/companies/accepted');
        setCompany(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching recruiters');
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // ✅ Filter companies by name or email based on search query
  const filteredCompanies = company.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Sidebar />
      <div>
        <br />
        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} align={'center'}>Recruiters</h3>

        {/* ✅ Search input field */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '8px',
              width: '250px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <table border={2} align={'center'}>
          <thead style={{ backgroundColor: '#4a8dc7' }}>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>See Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.name}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td><button className='action-btn'>See Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCompanies.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '10px', color: 'gray' }}>
            No matching recruiters found.
          </div>
        )}
      </div>
    </Layout>
  )
}

export default RecruitersList