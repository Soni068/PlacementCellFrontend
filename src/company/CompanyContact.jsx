import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CompanyLayout from './CompanyLayout'
import CompanySidebar from './CompanySidebar'

const CompanyContact = () => {

    const [adminData, setAdminData] = useState([]);  // State to hold fetched data
    const [error, setError] = useState(null);        // State to handle error

    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  //const storedName = localStorage.getItem('companyName');
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
      const storedName = localStorage.getItem('companyName');
      const storedEmail = localStorage.getItem('companyEmail');
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    }, []);  // Empty array ensures the effect runs only once on mount

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const feedbackData = {
        company: { name: name }, // assuming name is the company name
        companyEmail: email,
        message: message
      };
  
      try {
        await axios.post('http://localhost:8080/api/companyFeedback', feedbackData);
        setSuccessMessage('Feedback submitted successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        setError('Failed to submit feedback.');
      }
    };

  return (
    <CompanyLayout>
        <CompanySidebar />
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

       {/* Feedback Form */}
       <div className="feedback-form" style={{ flex: 1 }}>
          <h3>Give us your feedback</h3>
          <form  onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                disabled
                readOnly
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit Feedback</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>

        </CompanyLayout>
  )
}

export default CompanyContact