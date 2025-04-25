import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'; 
import Sidebar from './Sidebar'
import Layout from './Layout'
import './StudentDetails.css'
import axios from 'axios'

const StudentDetails = () => {

    const { stud_id } = useParams();  // Get student ID from the URL
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/student/studentDetails/${stud_id}`);
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching student details');
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [stud_id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

  return (
    <Layout>
        <Sidebar />
        <div className="table-container">
      <div className="container mx-auto p-6">
        <h3 className="text-2xl font-bold underline text-center mb-6">
          Student Details
        </h3>
        {student && (
          <div className="flex justify-center">
            <table className="w-3/4 border border-gray-300 shadow-lg rounded-lg">
              <tbody>
                <tr className="bg-gray-200">
                  <td className="border p-4 font-semibold">Student ID</td>
                  <td className="border p-4">{stud_id}</td>
                </tr>
                <tr>
                  <td className="border p-4 font-semibold">Name</td>
                  <td className="border p-4">{student.name}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border p-4 font-semibold">Email</td>
                  <td className="border p-4">{student.email}</td>
                </tr>
                <tr>
                  <td className="border p-4 font-semibold">Course</td>
                  <td className="border p-4">{student.course}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border p-4 font-semibold">Marks (10th)</td>
                  <td className="border p-4">{student.marks10}</td>
                </tr>
                <tr>
                  <td className="border p-4 font-semibold">Marks (12th)</td>
                  <td className="border p-4">{student.marks12}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="border p-4 font-semibold">Marks (UG)</td>
                  <td className="border p-4">{student.marksUg}</td>
                </tr>
                <tr>
                  <td className="border p-4 font-semibold">Marks (PG)</td>
                  <td className="border p-4">{student.marksPg}</td>
                </tr>
             
                {/* Resume Section */}
                <tr className="bg-gray-200">
                    <td className="border p-4 font-semibold">Resume</td>
                    <td className="border p-4">
                      {student.resumePath ? (
                        <a
                          href={`http://localhost:8080/api/student/uploads/Resumes/${student.resumePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {student.resumePath}
                        </a>
                      ) : (
                        "No resume available"
                      )}
                    </td>
                  </tr>
                            
        {/* Certificates Section */}
        {student?.certificatePaths?.length > 0 && (
          <>
          <tr className="bg-gray-200">
          <td className="border p-4" colSpan="2" style={{ textAlign: "center" , fontWeight: "bold" }}>
            Certificates
          </td>
        </tr>
            {student.certificatePaths.map((certificatePaths, index) => (
              <tr key={index}>
                <td className="border p-4">Certificate {index + 1}</td>
                <td className="border p-4">
                  <a
                    href={`http://localhost:8080/api/student/uploads/Certificates/${certificatePaths}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {certificatePaths}
                  </a>
                </td>
              </tr>
            ))}
          </>
        )}
            </tbody>
            </table>
          </div>
        )}
         
        
      </div></div><br/><br/><br/>
    </Layout>
  )
}

export default StudentDetails