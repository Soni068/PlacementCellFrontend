import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'
import './CandidateContact.css'
const CandidateContact = () => {

    const [adminData, setAdminData] = useState([]);  // State to hold fetched data
  const [error, setError] = useState(null);        // State to handle error

  const [studId, setStudId] = useState('');
const [name, setName] = useState(''); // assuming you'll need email
const [message, setMessage] = useState('');
const [submitStatus, setSubmitStatus] = useState(null);
useEffect(() => {
  const storedName = localStorage.getItem('userName');
  const storedId = localStorage.getItem('userId');
  if (storedName) setName(storedName);
  if (storedId) setStudId(storedId);
}, []);

// Function to handle form submission
const handleFeedbackSubmit = async (e) => {
  e.preventDefault();

  try {
    const feedbackData = {
      student: {
        stud_id: studId,
      },
      message: message
    };

    const response = await axios.post('http://localhost:8080/api/feedback', feedbackData);

    if (response.status === 200 || response.status === 201) {
      setSubmitStatus('Feedback submitted successfully!');
      setStudId('');
      setMessage('');
    } else {
      setSubmitStatus('Failed to submit feedback.');
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    setSubmitStatus('Something went wrong.');
  }
};
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
    <CandidateLayout>
        <StudentSidebar />
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
          <form onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <label htmlFor="stud_id">Student Id</label>
              <input
                type="text"
                id="stud_id"
                value={studId}
                onChange={(e) => setStudId(e.target.value)}
                required
                readOnly
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
          {submitStatus && <p>{submitStatus}</p>}
        </div>

    </CandidateLayout>
  )
}

export default CandidateContact