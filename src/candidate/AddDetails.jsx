import React from 'react'
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'
import './AddDetails.css'
const AddDetails = () => {
  return (
    <CandidateLayout >
        <StudentSidebar /><br/><br/>
        <div className="right-content" align={'center'}>
            <a href="/candidate/AddDetails/AddMarks">Add Marks</a><hr/>
            <a href="/candidate/AddDetails/UploadResume">Upload Resume</a><hr/>
            <a href="/candidate/AddDetails/UploadCertificates">Upload Certificates</a><hr/>
            <a href="/candidate/AddDetails/SeeDetails">See Details</a><hr/>
        </div>
    </CandidateLayout>
  )
}

export default AddDetails