import React, { useState } from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import axios from 'axios';
import './TeamMembers.css'
const TeamMember = () => {

    const [formData, setFormData] = useState({
        tea_name: '',
        tea_email: '',
        tea_phone: '',
        tea_post: '',
        tea_image: null // This will store the image file
      });
      const [successMessage, setSuccessMessage] = useState('');
      // Handle form field changes
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === 'file') {
          setFormData({
            ...formData,
            tea_image: files[0] // Storing the file object in state
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('tea_name', formData.tea_name);
        data.append('tea_email', formData.tea_email);
        data.append('tea_phone', formData.tea_phone);
        data.append('tea_post', formData.tea_post);
        if (formData.tea_image) {
          data.append('tea_image', formData.tea_image); // Append the image file
        }
        // Make API call to save team member
        axios.post('http://localhost:8080/api/team/create', data)
          .then((response) => {
            console.log('Team member added:', response.data);

            setSuccessMessage('Team member added successfully!');
            // Optionally, clear the form or show a success message
            setFormData({
              tea_name: '',
              tea_email: '',
              tea_phone: '',
              tea_post: '',
              tea_image: null 
            });

            setTimeout(() => {
                setSuccessMessage('');
              }, 10000);
          })

          
          .catch((error) => {
            console.error('There was an error adding the team member:', error);
          });
      };
    
    

  return (
    <Layout>

        <Sidebar/>
        
       <br/><div className="team-member-form">
        <h2>Add Team Member</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tea_name">Name</label>
            <input
              type="text"
              id="tea_name"
              name="tea_name"
              value={formData.tea_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tea_email">Email</label>
            <input
              type="email"
              id="tea_email"
              name="tea_email"
              value={formData.tea_email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tea_phone">Phone</label>
            <input
              type="text"
              id="tea_phone"
              name="tea_phone"
              value={formData.tea_phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"  // Matches 10 digits phone numbers
            />
          </div>
          <div>
            <label htmlFor="tea_post">Post</label>
            <input
              type="text"
              id="tea_post"
              name="tea_post"
              value={formData.tea_post}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="tea_image">Image</label>
            <input
              type="file"
              id="tea_image"
              name="tea_image"
              onChange={handleChange}
              accept="image/*" // Only accept image files
              required
            />
          </div>
          <button type="submit">Add Team Member</button>
        </form>
      </div><br/>
      
        </Layout>
  )
}

export default TeamMember