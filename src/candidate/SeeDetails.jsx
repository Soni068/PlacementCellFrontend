import React, { useState, useEffect } from "react";
import CandidateLayout from "./CandidateLayout";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";

const SeeDetails = () => {
  const userId = localStorage.getItem("userId");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/student/studentDetails/${userId}`
        );
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching student details");
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [userId]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <CandidateLayout>
      <StudentSidebar />
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
                  <td className="border p-4">{userId}</td>
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

<tr>
  <td className="border p-4 font-semibold">End of Session</td>
  <td className="border p-4">
    {student.endOfSession ? new Date(student.endOfSession).toLocaleDateString() : "Not available"}
  </td>
</tr>
            </tbody>
            </table>
          </div>
        )}
         
        
      </div></div><br/><br/><br/>
    </CandidateLayout>
  );
};

export default SeeDetails;
