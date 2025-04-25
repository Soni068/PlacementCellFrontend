import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CompanyLayout from './CompanyLayout'
import CompanySidebar from './CompanySidebar'
import './PostedJobs.css'
const PostedJobs = () => {
  const navigate = useNavigate();
    const companyName = localStorage.getItem('companyName') || 'Your Company';
  const [jobs, setJobs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedAvailableCourses, setSelectedAvailableCourses] = useState([]);
  const coursesList = [
    'Btech',
    'BCA',
    'Bsc',
    'Mtech',
    'MCA',
    'Msc',
  ];
  

  // Fetch posted jobs when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${companyName}`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data); // Set the fetched jobs in the state
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [companyName]); 

  const handleEditClick = async (job) => {
    setSelectedJob(job); // Store the job data to edit
    setShowEditModal(true); // Show the modal
    try {
        const response = await fetch(`http://localhost:8080/api/jobs/job/${job.id}`);
        if (response.ok) {
            const data = await response.json();
            // Assuming the response contains the job data and its associated courses
            setSelectedJob((prevSelectedJob) => ({
                ...prevSelectedJob,
                courses: data.courses, // Assume 'courses' is the key for the courses data
            }));
        } else {
            console.error('Failed to fetch job details and courses');
        }
    } catch (error) {
        console.error('Error fetching job details and courses:', error);
    }

  };


  const handleDeleteClick = async (jobId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/jobDelete/${jobId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Filter out the deleted job from the jobs list
          setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
          alert('Job deleted successfully');
        } else {
          console.error('Failed to delete the job');
          alert('Failed to delete the job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('An error occurred while deleting the job');
      }
    }
  };
  
  const handleAppliedCandidatesClick = (jobId) => {
    navigate(`/company/candidates/${jobId}`);
  };
  
  

  const handleCloseModal = () => {
    setShowEditModal(false); // Close the modal
  };

  const handleAvailableCoursesChange = (e) => {
    const { value, checked } = e.target;
    setSelectedAvailableCourses((prevSelectedCourses) => {
      if (checked) {
        // Add course to selected courses if it’s checked
        return [...prevSelectedCourses, value];
      } else {
        // Remove course from selected courses if it’s unchecked
        return prevSelectedCourses.filter((course) => course !== value);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedJob((prevJob) => ({
      ...prevJob,
      [name]: value, // Dynamically update the selected job field based on input's name attribute
    }));
  };
  

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const updatedJobData = {
      ...selectedJob,
      /*courses: selectedJob.selectedCourses || [],*/
      courses: selectedAvailableCourses,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/jobs/job/${selectedJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJobData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Job updated successfully', data);
        alert('Job updated successfully!');
        setShowEditModal(false); // Close the modal
      } else {
        console.error('Failed to update job');
        alert('Failed to update the job.');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('An error occurred while updating the job.');
    }
  };

  return (
    <CompanyLayout>
        <CompanySidebar/>
        <div className="posted-jobs-container">
        <h2>Posted Jobs</h2>
        <div className="jobs-list">
          {jobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p>Location: {job.location}</p>
                <p>Salary: {job.salary}</p>
                <p>Deadline: {job.deadline}</p>
                {/* You can display other job details as needed */}
              <div className='button-contain'>
                <button 
                  className="edit-button"
                  onClick={() => handleEditClick(job)}
                >
                  Edit
                </button>

                <button 
                  className="delete-button"
                  onClick={() => handleDeleteClick(job.id)} 
                >
                  Delete
                </button>
                <button className='candidate-button' onClick={() => handleAppliedCandidatesClick(job.id)}>
                  Candidates
                </button>
              </div>

              
              </div>
            ))
          )}
        </div>
      </div>

      {showEditModal && selectedJob && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
          <button className="close-modal-button" onClick={handleCloseModal}>×</button>
            <h3>Edit Job</h3>
            <form onSubmit={handleSubmitEdit} >
            <label>Job Id</label>
            <input type="text" value={selectedJob.id} disabled />
             
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={selectedJob.title || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required />

              <label>Description</label>
              <textarea
              name="description"
                value={selectedJob.description || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required ></textarea>

              <label>Location</label>
              <input
                type="text"
                name="location"
                value={selectedJob.location || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required />

<label>Job Type</label>
  <select
    value={selectedJob.type}
    onChange={(e) => setSelectedJob({ ...selectedJob, type: e.target.value })}
  >
    <option value="Full-time">Full-time</option>
    <option value="Internship">Internship</option>
  </select>

              <label>Salary</label>
              <input
                type="text"
                name="salary"
                value={selectedJob.salary || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required />

<label>Skills</label>
              <input
                type="text"
                name="skills"
                value={selectedJob.skills || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required />


               {/* Display courses */}
               <label>Selected Courses</label>
        {selectedJob.courses && selectedJob.courses.length > 0 ? (
          <div className="course-checkboxes">
            {selectedJob.courses.map((course, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`course-${index}`}
                  value={course}
                  checked={selectedJob.selectedCourses?.includes(course) || false}  // Check if the course is selected
                  onChange={() => {
                    // Handle the checkbox change and update selectedCourses
                    const newSelectedCourses = [...(selectedJob.selectedCourses || [])];
                    if (newSelectedCourses.includes(course)) {
                      // If the course is already selected, remove it
                      const index = newSelectedCourses.indexOf(course);
                      newSelectedCourses.splice(index, 1);
                    } else {
                      // If the course is not selected, add it
                      newSelectedCourses.push(course);
                    }
                    setSelectedJob(prev => ({
                      ...prev,
                      selectedCourses: newSelectedCourses,
                    }));
                  }}
                  disabled/>
                <label htmlFor={`course-${index}`}>{course}</label>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses associated with this job.</p>
        )}

<label>Available Courses</label>
<div className="courses-container">
  {coursesList.map((course) => (
    <div key={course}>
      <input
        type="checkbox"
        id={course}
        name="availableCourses"
        value={course}
        checked={selectedAvailableCourses.includes(course)} // Check if the course is selected
        onChange={handleAvailableCoursesChange} // Update selected courses on change
    />
      <label htmlFor={course}>{course}</label>
    </div>
  ))}
</div>

<label>UgCgpa</label>
              <input
                type="text"
                name="ugCgpa"
                value={selectedJob.ugCgpa || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required />

<label>PgCgpa</label>
              <input
                type="text"
                name="pgCgpa"
                value={selectedJob.pgCgpa || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required />
             

<label>Company Website</label>
              <input
                type="url"
                name="companyWebsite"
                value={selectedJob.companyWebsite || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
             required />


              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                value={selectedJob.deadline || ''}
                onChange={handleInputChange}
                // handle input changes for updating job data
              required />

              {/* Add other fields as needed */}

              <button type="submit">Save Changes</button><br/><br/>
              
            </form>
          </div>
        </div>
      )}



    </CompanyLayout>
   
  )
}

export default PostedJobs