import React, {useState, useEffect} from 'react'
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'
import axios from 'axios'
const CandidateRecruiters = () => {
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
    <CandidateLayout>
      <StudentSidebar />
      <div>
      <br/> <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} align={'center'}> Recruiters</h3>
        <table border={2} align={'center'}>
          <thead style={{backgroundColor:'#4a8dc7'}}>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {company.map((company) => (
              <tr key={company.name}>
                <td>{company.name}</td>
                <td>{company.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
      </CandidateLayout>
  )
}

export default CandidateRecruiters