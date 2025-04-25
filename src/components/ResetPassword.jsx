import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { role } = useParams(); // Get role from URL path (e.g., student, company, admin)
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    if (!token || !role) {
      setMessage("Invalid or missing token or role.");
    } else {
      setValidToken(true);
    }
  }, [token, role]);

  const endpointMap = {
    student: "http://localhost:8080/api/student/resetPassword",
    company: "http://localhost:8080/api/companies/resetPassword",
    admin: "http://localhost:8080/api/resetPassword",
  };

  const redirectMap = {
    student: "/studentLogin",
    company: "/companyLogin",
    admin: "/adminLogin",
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
  
    const endpoint = endpointMap[role];
    const redirect = redirectMap[role];
  
    if (!endpoint) {
      setMessage("Invalid role.");
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(endpoint, {
        token,
        newPassword,
      });
  
      setMessage(response.data.message || "Password reset successful.");
      setTimeout(() => navigate(redirect), 3000);
    } catch (error) {
      setMessage(error.response?.data || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>Reset Password ({role})</h2>
      {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
      {validToken ? (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
          />
          <button onClick={handleResetPassword} disabled={loading} style={{ padding: "10px", width: "100%" }}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      ) : (
        <p>Invalid or expired token.</p>
      )}
    </div>
  );
};

export default ResetPassword;