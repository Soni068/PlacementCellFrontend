import React, { useState, useEffect} from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import axios from 'axios'
import './StudentsList.css'
import { Link } from 'react-router-dom'
const RecruitersList = () => {
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
        const response = await axios.get('http://localhost:8080/api/companies/accepted');
        setCompany(response.data);  // Assuming your API returns an array of students
        setLoading(false);
      } catch (error) {
        setError('Error fetching students');
        setLoading(false);
      }
    };

    fetchCompany();
  }, []); // Empty dependency array ensures it runs only once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <Layout>
        <Sidebar />
        <div>
      <br/> <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} align={'center'}> Recruiters</h3>
        <table border={2} align={'center'}>
          <thead style={{backgroundColor:'#4a8dc7'}}>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
             <th>See Details</th>
            </tr>
          </thead>
          <tbody>
            {company.map((company) => (
              <tr key={company.name}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>
                  <Link to={`/recruiterDetails/${company.name}`}>
                    <button className="action-btn">See Details</button>
                  </Link>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </Layout>
  )
}

export default RecruitersList