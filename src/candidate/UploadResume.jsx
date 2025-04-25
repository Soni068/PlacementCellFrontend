import React, {useState} from 'react'
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'
import './UploadResume.css'
const UploadResume = () => {
    const userId = localStorage.getItem('userId');

    const [file, setFile] = useState(null)

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  // Handle file upload
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload.")
      return
    }

    // Create FormData to send the file
    const formData = new FormData()
    formData.append("resume", file)

    // The API endpoint, assuming ABMCA23064 is the student ID
    
    const uploadUrl = `http://localhost:8080/api/student/uploadResume/${userId}`

    // Make the API call to upload the resume
    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.text()) // Receive plain text response from backend
    .then((data) => {
        // If the response contains the word 'success', consider it successful
        if (data.toLowerCase().includes("successfully")) {
            alert("Resume uploaded successfully!");
        } else {
            alert(`Error uploading resume: ${data}`);
        }
    })
    .catch((error) => {
        console.error('Error uploading resume:', error);
        alert("Error uploading resume.");
    })
  }

  return (
    <CandidateLayout>
        <StudentSidebar />
        <div className="upload-resume" align={'center'}>
        <h2>Upload Resume</h2><br/>
        <h5>Student Id : {userId}</h5><br/>
        <input 
          type="file" 
          accept=".pdf, .docx, .txt" 
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </CandidateLayout>
  )
}

export default UploadResume