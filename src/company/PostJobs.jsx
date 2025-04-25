import React, {useState} from 'react'
import CompanyLayout from './CompanyLayout';
import CompanySidebar from './CompanySidebar';
import './PostJobs.css'
const PostJobs = () => {
    const companyName = localStorage.getItem('companyName') || 'Your Company';
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        type: '',
        deadline: '',
        skills: '',
        courses: [],
        ugCgpa: '',
        pgCgpa: '',
        companyWebsite: ''
      });

      const coursesList = [
        'Btech',
        'BCA',
        'Bsc',
        'Mtech',
        'MCA',
        'Msc',
      ];

      // Handle form input change
  const handleInputChange = (event) => {
    const { name, value, type, checked  } = event.target;
    if (type === 'checkbox') {
        // Handle checkbox selection/deselection
        setFormData((prevData) => {
            let updatedCourses;
            if (checked) {
                updatedCourses = [...prevData.courses, value]; // Add selected course
            } else {
                updatedCourses = prevData.courses.filter((course) => course !== value); // Remove deselected course
            }
            return {
                ...prevData,
                courses: updatedCourses,
            };
        });
    } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the job data
    const jobData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      salary: formData.salary,
      type: formData.type,
      deadline: formData.deadline,
      skills: formData.skills,
      courses: formData.courses ,
      ugCgpa: parseFloat(formData.ugCgpa),
      pgCgpa: parseFloat(formData.pgCgpa),
      companyWebsite: formData.companyWebsite
    };

    // Send POST request to backend
    const response = await fetch(`http://localhost:8080/api/jobs/${companyName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Job posted successfully', data);
      alert('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        salary: '',
        type: '',
        deadline: '',
        skills: '',
        courses: [],
        ugCgpa: '',
        pgCgpa: '',
        companyWebsite: ''
      }); // Reset form
    } else {
      console.error('Error posting job');
      alert('Failed to post the job.');
    }
  };

  return (
    <CompanyLayout>
        <CompanySidebar />
    <div className="post-jobs-container">
            <h2>Post a Job</h2>
            <div className="company-name">Company: {companyName}</div> {/* Display Company Name */}
            <form className="post-jobs-form" onSubmit={handleSubmit}>
                <label>Job Title</label>
                <input type="text" name="title" placeholder="Enter job title" value={formData.title}
            onChange={handleInputChange} required/>

                <label>Description</label>
                <textarea name="description" placeholder="Enter job description" value={formData.description}
            onChange={handleInputChange} required></textarea>

                <label>Location</label>
                <input type="text" name="location" placeholder="Enter job location" value={formData.location}
            onChange={handleInputChange} required/>

                <label>Salary</label>
                <input type="text" name="salary" placeholder="Enter salary range"  value={formData.salary}
            onChange={handleInputChange} required/>

                <label>Job Type</label>
                <select name="type" value={formData.type}
            onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Internship">Internship</option>
                </select>

                <label>Application Deadline</label>
                <input type="date" name="deadline" value={formData.deadline}
            onChange={handleInputChange} required/>

                <label>Required Skills</label>
                <input type="text" name="skills" placeholder="E.g., Java, React, SQL" value={formData.skills}
            onChange={handleInputChange} required/>

<label>Courses</label>
          <div className="courses-container">
            {coursesList.map((course) => (
              <div key={course}>
                <input
                  type="checkbox"
                  id={course}
                  name="courses"
                  value={course}
                  checked={formData.courses.includes(course)} // Check if the course is selected
                  onChange={handleInputChange}
                />
                <label htmlFor={course}>{course}</label>
              </div>
            ))}
            </div>

                <label>UG CGPA Criteria</label>
                <input type="number" name="ugCgpa" className="cgpa-input" placeholder="Enter UG CGPA (e.g., 7.0)" step="0.1" min="0" max="10" value={formData.ugCgpa}
            onChange={handleInputChange} required />

                <label>PG CGPA Criteria</label>
                <input type="number" name="pgCgpa" className="cgpa-input" placeholder="Enter PG CGPA (e.g., 7.0)" step="0.1" min="0" max="10" value={formData.pgCgpa}
            onChange={handleInputChange} />

                <label>Company Website Link</label>
                <input type="url" name="companyWebsite" placeholder="Enter company website (e.g., https://example.com)" value={formData.companyWebsite}
            onChange={handleInputChange} required/>

                <button type="submit">Post Job</button>
            </form>
        </div>
        </CompanyLayout>
  )
}

export default PostJobs