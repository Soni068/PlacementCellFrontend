import React, { useEffect, useState} from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import './StudentsList.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const StudentsList = () => {
    const [students, setStudents] = useState([]);

  // State to handle loading state
  const [loading, setLoading] = useState(true);

  // State to handle any errors during the fetch
  const [error, setError] = useState(null);

  // Fetch data from API when the component is mounted
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await axios.get('http://localhost:8080/api/student/studentsList');
        setStudents(response.data);  // Assuming your API returns an array of students
        setLoading(false);
      } catch (error) {
        setError('Error fetching students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array ensures it runs only once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


  return (
    <Layout>
        <Sidebar />
    <div className='table-container'> 
      <br/> <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} align={'center'}> Students</h3>
        <table border={2} align={'center'}>
          <thead style={{backgroundColor:'#4a8dc7'}}>
            <tr>
              <th>Student Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Status</th>
             <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.stud_id}>
                <td>{student.stud_id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>{student.status1}</td>
                <Link to={`/studentDetails/${student.stud_id}`}>
                <td><button className='action-btn'>See Details</button></td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </Layout>
  )
}

export default StudentsList