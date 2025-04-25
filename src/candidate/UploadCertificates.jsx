import React, {useState} from 'react'
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'
import './UploadCertificates.css'
import axios from 'axios'
const UploadCertificates = () => {
    const userId = localStorage.getItem('userId');

    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    // Handle the file upload
    const handleUpload = async () => {
        // Ensure at least one file is selected
        if (files.length === 0) {
            setMessage("Please select at least one certificate.");
            return;
        }

        const formData = new FormData();
        
        // Append each selected file to the form data
        for (let i = 0; i < files.length; i++) {
            formData.append("certificates", files[i]);
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/student/uploadCertificates/${userId}`, // Update this with your API URL
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',  // Required for file uploads
                    }
                }
            );
            setMessage(response.data);
            setFiles([]);  // Assuming response is a success message
        } catch (error) {
            setMessage("Error uploading certificates: " + error.message);
        }
    };

  return (
   <CandidateLayout>
    <StudentSidebar/>
    <div className="upload-certificate" align={'center'}>
            <h2>Upload Certificates</h2><br/>
            <h5>Student Id : {userId}</h5><br/>
            <input
                type="file"
                name="certificates"
                multiple // Allow multiple file selection   
                onChange={handleFileChange} 
            />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}

           
        </div>
   </CandidateLayout>
  )
}

export default UploadCertificates