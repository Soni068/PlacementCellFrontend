import React, {useState, useEffect}  from 'react'

import axios from 'axios';
import { Layout } from './Layout'

const Contact = () => {

    const [adminData, setAdminData] = useState([]);  // State to hold fetched data
    const [error, setError] = useState(null);        // State to handle error

   
  
    // Fetch data when the component mounts
    useEffect(() => {
      // Function to fetch the admin data from the backend
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/ContactList');
          setAdminData(response.data);  // Set the response data to state
        } catch (error) {
          setError('Error fetching admin data.'); // Handle error
        }
      };
  
      fetchData();  // Call the fetch function when component mounts
    }, []);  // Empty array ensures the effect runs only once on mount


  return (
    <Layout>
    <div className="admin-contact-list-container" align="center">
        <h2 className='Contact-h2'>Contact Us</h2>

        {error && <div className="error-message">{error}</div>}

        {adminData.length === 0 ? (
          <p>No admin contact details found.</p>
        ) : (
          <div className="contact-card-container">
            {adminData.map((admin, index) => (
              <div key={index} className="contact-card-container-inner">
                {/* Email Card */}
                <div className="contact-card email-card">
                <div className="contact-card-header">
                    <h3>Email</h3>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>{admin.contEmail}</span>
                  </div>
                </div>
                {/* Phone Card */}
                <div className="contact-card phone-card">
                <div className="contact-card-header">
                    <h3>Phone</h3>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>{admin.phone}</span>
                  </div>
                </div>
                {/* Address Card */}
                <div className="contact-card address-card">
                <div className="contact-card-header">
                    <h3>Address</h3>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{admin.address}</span>
                  </div>
                  <br/><br/><br/><br/><br/><br/>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

       
    </Layout>
  )
}

export default Contact