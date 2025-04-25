import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'
import axios from 'axios';
import './ContactUs.css'
const ContactUs = () => {

  const [contEmail, setContEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [error, setError] = useState('');

 // Fetch existing contact details when the component loads
 useEffect(() => {
  const fetchContactDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/ContactList'); // GET request to fetch the contact details
      const contact = response.data[0]; // Assuming the contact info is stored in an array, and we are interested in the first entry
      if (contact) {
        setContEmail(contact.contEmail || '');
        setPhone(contact.phone || '');
        setAddress(contact.address || '');
      }
    } catch (err) {
      console.error("Error fetching contact details:", err);
      setError('Error fetching contact details.');
    }
  };

  fetchContactDetails();  // Call the function when the component mounts
}, []);

  // Handle form input changes
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setContEmail(value);
    } else if (name === 'phone') {
      setPhone(value);
    } else if (name === 'address') {
      setAddress(value);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  // Validate Phone Number Format
  const validatePhone = (phone) => {
    // Regular expression for validating phone number format (e.g., 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Phone number must be 10 digits.');
    } else {
      setPhoneError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    validateEmail(contEmail);
    validatePhone(phone);

    // Check if there are any validation errors before submitting
    if (emailError || phoneError || !contEmail || !phone || !address) {
      setError('Please fix the errors before submitting.');
      return;
    }

    // Prepare the data to send
    const data = {
      contEmail,
      phone,
      address
    };

    try {
      // Send the PUT request to the backend
      const response = await axios.put('http://localhost:8080/api/update', null, {
        params: {
          contEmail: data.contEmail,
          phone: data.phone,
          address: data.address
        }
      });

      // Check if the update was successful
      if (response.data === "Admin details updated successfully!") {
        setMessage("Contact details updated successfully!");
      } else {
        setError("Please fix the error before submitting.");
      }
    } catch (error) {
      console.error("There was an error updating the admin details:", error);
      setError("Error updating Contact details.");
    }
  };

  return (
    <Layout>
        <Sidebar /><br/><br/>
        <div className="admin-contact-form-container" align={'center'}>
        <h2>Admin - Add Contact Information</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className='label1'><i className="fas fa-envelope"></i> Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contEmail}
              onChange={handleChange}
              required
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone"  className='label1'> <i className="fas fa-phone"></i>Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              required
            />
             {phoneError && <div className="error-message">{phoneError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="address"  className='label1'><i className="fas fa-map-marker-alt"></i>Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Contact Information
          </button>
        </form>
        {/* Display success or error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>
    </Layout>
  )
}

export default ContactUs