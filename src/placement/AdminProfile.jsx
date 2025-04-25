import React, { useState } from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import axios from 'axios';
const AdminProfile = () => {
     // State for managing the contact details and API loading state
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewContactDetails, setViewContactDetails] = useState(false); // State to toggle visibility of contact details
  const storedEmail = localStorage.getItem("adminEmail");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ email: storedEmail });

  // Handle View Contact Details button click
  const handleViewContactDetails = async () => {
    setLoading(true);  // Show loading spinner or any loader
    setError(null);    // Reset error state
    try {
      // Make a GET request to the backend API to fetch contact details
      const response = await axios.get('http://localhost:8080/api/ContactList');  // Replace with your actual API URL
      setContactDetails(response.data);  // Update state with the fetched contact details
      setViewContactDetails(true);
    } catch (error) {
      setError('Error fetching contact details');  // Handle error if API request fails
    }
    setLoading(false);  // Stop loading
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/updateEmail', null, {
        params: {
          email: formData.email
        }
      });
  
      localStorage.setItem("adminEmail", formData.email);
      alert('Email updated successfully!');
      setEditMode(false);
      window.location.reload(); // optional
    } catch (err) {
      alert('Failed to update admin email');
      console.error(err);
    }
  };
  
  return (
    <Layout>
        <Sidebar />
        <div className='right-content' align={'center'} style={{marginLeft: '980px'}}>
        {!viewContactDetails && (
          <>
            <p style={{fontWeight : 'bold'}}>Admin</p>
            
            <p>{formData.email}</p><hr/>
            {!editMode && (
          <button
            style={{
              backgroundColor: 'green',
              color: 'white',
              width: '100%',
              padding: '10px',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={handleEditClick}
          >
            Edit
          </button>
        )}
        {editMode && (
          <form onSubmit={handleUpdate}  style={{ textAlign: 'left', width: '80%', margin: '20px auto' }}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required/><br /><br />
            <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none' }}>
              Save
            </button>
            <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </form>
        )}<br/><br/>

<button style={{
                backgroundColor: '#0a500d', 
                color: 'white', 
                width: '100%',  // This will make the button width 100% of the parent container's width
                padding: '10px',  // Adjust padding for button height
                border: 'none',
                cursor: 'pointer'
            }} onClick={handleViewContactDetails} >View Contact Details</button></>
        )}

             {/* Display loading message or contact details */}
        {loading && <p>Loading...</p>}

{/* Display error if there was a problem fetching the data */}
{error && <p>{error}</p>}

{/* Display the contact details if available */}
{contactDetails.length > 0 && (
  <div style={{
    marginTop: '20px',
    alignItems: 'flex-start', // Align to the left
    padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '40px',
              width: '100%'
              
   
  }}>
    <h4>Contact Details</h4><hr/>
    <ul style={{
                listStyleType: 'none',
                paddingLeft: '0',
              }}>
      {contactDetails.map((contact, index) => (
        <li key={index}>
          
          <p><strong>Email:</strong> {contact.contEmail}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Address:</strong> {contact.address}</p>
          <hr />
        </li>
      ))}
    </ul>
  </div>
)}
        </div>
        </Layout>
    
  )
}

export default AdminProfile