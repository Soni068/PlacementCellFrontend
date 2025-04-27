import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import './StudentsList.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Search query state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/student/studentsList');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // ✅ Filtered students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Sidebar />
      <div className='table-container'>
        <br />
        <h3 style={{ fontWeight: 'bold', textDecoration: 'underline' }} align='center'>Students</h3>

        {/* ✅ Search input field */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name..."
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

        <table border={2} align='center'>
          <thead style={{ backgroundColor: '#4a8dc7' }}>
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
            {filteredStudents.map((student) => (
              <tr key={student.stud_id}>
                <td>{student.stud_id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>{student.status1}</td>
                <td>
                  <Link to={`/studentDetails/${student.stud_id}`}>
                    <button className='action-btn'>See Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '10px', color: 'gray' }}>
            No students found.
          </div>
        )}
      </div>
    </Layout>
  )
}

export default StudentsList
