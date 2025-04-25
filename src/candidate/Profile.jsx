import React, { useState, useEffect }  from 'react'
import CandidateLayout from "./CandidateLayout";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";
const Profile = () => {
    const userId = localStorage.getItem("userId");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    marks10: "",
    marks12: "",
    marksUg: "",
    marksPg: "",
    endOfSession: "",
  });

  // Fetch student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/student/studentDetails/${userId}`
        );
        setStudent(response.data);

        setUpdatedData({
          name: response.data.name || "",
          phone: response.data.phone || "",
          email: response.data.email || "",
          course: response.data.course || "",
          marks10: response.data.marks10 || "",
          marks12: response.data.marks12 || "",
          marksUg: response.data.marksUg || "",
          marksPg: response.data.marksPg || "",
          endOfSession: response.data.endOfSession || "",
        });
      } catch (error) {
        setError("Error fetching student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Save updated details
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/student/updateProfile/${userId}`,
        updatedData
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <CandidateLayout>
    <StudentSidebar />
    <div className="container mx-auto p-4"  style={{maxHeight:"100vh", overflowY: "auto"}}>
      <h3 className="text-xl font-bold underline text-center mb-4">
        Student Profile
      </h3>

      {student && (
        <div className="flex justify-center">
          <table className="w-1/2 border border-gray-300 shadow-lg rounded-md text-sm">
            <tbody>
              <tr className="bg-gray-100">
                <td className="border p-2 font-semibold">Student ID</td>
                <td className="border p-2">{userId}</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Name</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="name"
                    value={updatedData.name}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border p-2 font-semibold">Email</td>
                <td className="border p-2">
                  <input
                    type="email"
                    name="email"
                    value={updatedData.email}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Phone</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="phone"
                    value={updatedData.phone}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border p-2 font-semibold">Course</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="course"
                    value={updatedData.course}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Marks (10th)</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="marks10"
                    value={updatedData.marks10}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border p-2 font-semibold">Marks (12th)</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="marks12"
                    value={updatedData.marks12}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">Marks (UG)</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="marksUg"
                    value={updatedData.marksUg}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border p-2 font-semibold">Marks (PG)</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="marksPg"
                    value={updatedData.marksPg}
                    onChange={handleChange}
                    className="border p-1 w-full text-sm"
                  />
                </td>
              </tr>
              <tr className="bg-gray-100">
  <td className="border p-2 font-semibold">End of Session</td>
  <td className="border p-2">
    <input
      type="date"
      name="endOfSession"
      value={updatedData.endOfSession}
      onChange={handleChange}
      className="border p-1 w-full text-sm"
    />
  </td>
</tr>

            </tbody>
          </table>
        </div>
      )}

      {/* Save Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-blue-600 text-sm"
          style={{backgroundColor : 'green'}}
        >
          Save Profile
        </button><br/><br/><br/><br/>
      </div>
    </div>
  </CandidateLayout>
  )
}

export default Profile