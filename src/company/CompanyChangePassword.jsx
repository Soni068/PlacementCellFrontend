import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyLayout from './CompanyLayout';
import CompanySidebar from './CompanySidebar';
import axios from 'axios';

const CompanySetting = () => {
  const [email, setEmail] = useState(''); // You might want to get this from user session
  const [oldPassword, setOldPassword] = useState('');
  const [confirmOldPassword, setConfirmOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
   
    // Validation
    if (oldPassword !== confirmOldPassword) {
      setError("Old passwords don't match");
      return;
    }
   
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/api/companies/updatePassword', null, {
        params: {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword
        }
      });

      if (response.status === 200) {
        setMessage("Password changed successfully!");
        setError('');
        // Clear form
        setOldPassword('');
        setConfirmOldPassword('');
        setNewPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
      setMessage('');
    }
  };

  return (
    <CompanyLayout>
      <CompanySidebar />
      <div className="right-content" style={{ padding: '20px' }}>
        <h2>Company Settings</h2>
        <div style={{ margin: '20px 0' }}>
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div style={{ marginBottom: '10px' }}>
              <label>Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Old Password: </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Confirm Old Password: </label>
              <input
                type="password"
                value={confirmOldPassword}
                onChange={(e) => setConfirmOldPassword(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>New Password: </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Change Password</button>
          </form>
          {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
        <hr />
      </div>
    </CompanyLayout>
  );
};

export default CompanySetting;