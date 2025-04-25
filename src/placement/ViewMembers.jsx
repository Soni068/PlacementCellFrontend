import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import axios from 'axios';
import './ViewMember.css'
const ViewMembers = () => {

    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null); // State to store selected team member
  const [showEditModal, setShowEditModal] = useState(false); // State to handle modal visibility
  const [image, setImage] = useState(null); // State to handle image file


  useEffect(() => {
    // Fetch all team members on component mount
    axios.get('http://localhost:8080/api/team/all')
      .then((response) => {
        console.log('All team members:', response.data);
        setTeamMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching team members:', error);
      });
  }, []);

  
  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/team/delete/${id}`)
      .then(() => {
        setTeamMembers(teamMembers.filter(member => member.team_id !== id));
        alert('Team member deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting team member:', error);
      });
  };

  const handleEditClick = async (teamId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/team/${teamId}`);
        if (response.ok) {
            const data = await response.json();
            // Assuming data contains team member's info
            setSelectedJob(data); // Assuming selectedJob contains the information you need to edit
            setShowEditModal(true); // Show the modal
        } else {
            console.error('Failed to fetch team member details');
        }
    } catch (error) {
        console.error('Error fetching team member details:', error);
    }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setSelectedJob((prevJob) => ({
    ...prevJob,
    [name]: value,
  }));
};

const handleImageChange = (e) => {
  setImage(e.target.files[0]); // Update the state with the selected image file
};

// Handle form submission for updating team member
const handleSubmitEdit = (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('tea_name', selectedJob.tea_name);
  formData.append('tea_email', selectedJob.tea_email);
  formData.append('tea_phone', selectedJob.tea_phone);
  formData.append('tea_post', selectedJob.tea_post);

  if (image) {
    formData.append('tea_image', image); // Append image if selected
  }

  axios.put(`http://localhost:8080/api/team/update/${selectedJob.team_id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response) => {
    alert('Team member updated successfully');
    setShowEditModal(false); // Close modal after successful update
    // Optionally, re-fetch members to reflect changes or update the teamMembers state
    setTeamMembers(teamMembers.map(member => (member.team_id === selectedJob.team_id ? response.data : member)));
  })
  .catch((error) => {
    console.error('Error updating team member:', error);
    alert('Error updating team member');
  });
};

const handleCloseModal = () => {
  setShowEditModal(false); // Close the modal
};

  return (
    <Layout>
        <Sidebar/>
        <br />
      <div className="team-members-list">
        <h2>Team Members</h2>
        <div className="team-members">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div key={member.team_id} className="team-member">
                {/* Display image if it exists */}
                <div className="team-member-header">
                {member.tea_imageBase64 && (
                  <img
                    src={`data:image/jpeg;base64,${member.tea_imageBase64}`}
                    alt={member.tea_name}
                    style={{ width: '70px', height: '70px', borderRadius: '50%' }}
                  />
                )}
                <h3 style={{marginLeft: "-80px"}}>{member.tea_name}</h3>
                </div>
                <p>Email: {member.tea_email}</p>
                <p>Phone: {member.tea_phone}</p>
                <p>Post: {member.tea_post}</p>
                <div className='button-contain'>
                <button className='edit-button' onClick={() => handleEditClick(member.team_id)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(member.team_id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </div>
      </div>

      
{showEditModal && selectedJob && (
    <div className="edit-modal-overlay">
        <div className="edit-modal" style={{maxHeight: "80vh", maxWidth: "82vh", overflowY: "auto", marginTop:"-45px"}}>
        <button className="close-modal-button" onClick={handleCloseModal}>×</button>
            <h3>Edit Team Member</h3>
            <form onSubmit={handleSubmitEdit}>
                <label>Team Member ID</label>
                <input type="text" value={selectedJob.team_id} disabled />
                 
                <label>Name</label>
                <input
                    type="text"
                    name="tea_name"
                    value={selectedJob.tea_name || ''}
                    onChange={handleInputChange}
                    required 
                />

                <label>Email</label>
                <input
                    type="email"
                    name="tea_email"
                    value={selectedJob.tea_email || ''}
                    onChange={handleInputChange}
                    required 
                />

                <label>Phone</label>
                <input
                    type="text"
                    name="tea_phone"
                    value={selectedJob.tea_phone || ''}
                    onChange={handleInputChange}
                    required 
                />

                <label>Post</label>
                <input
                    type="text"
                    name="tea_post"
                    value={selectedJob.tea_post || ''}
                    onChange={handleInputChange}
                    required 
                />

                {/* Image file input */}
              <label>Image</label>
              <input
                type="file"
                onChange={handleImageChange}
              />

             {selectedJob.tea_imageBase64 && (
                <div>
                  <img src={`data:image/jpeg;base64,${selectedJob.tea_imageBase64}`} alt="Team Member" width="100" />
                </div>
             )}

                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>
)}
      
    </Layout>
  )
}

export default ViewMembers