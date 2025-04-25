import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ForgotPassword = () => {
  const { userType } = useParams(); // get userType from the URL
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getEndpoint = () => {
    switch (userType) {
      case "student":
        return "http://localhost:8080/api/student/forgotPassword";
      case "companies":
        return "http://localhost:8080/api/companies/forgotPassword"; // ✅ corrected route
      case "admin":
        return "http://localhost:8080/api/forgotPassword";
      default:
        return "";
    }
  };

  const handleSendResetLink = async () => {
    setMessage({ text: "", type: "" });

    if (!email) {
      setMessage({ text: "Please enter your email.", type: "error" });
      return;
    }

    if (!isValidEmail(email)) {
      setMessage({ text: "Invalid email format.", type: "error" });
      return;
    }

    const endpoint = getEndpoint();
    if (!endpoint) {
      setMessage({ text: "Invalid user type.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await axios.post(endpoint, { email });

      setMessage({ text: "✅ Password reset link sent! Check your email.", type: "success" });
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "❌ Error: Email not found!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Forgot Password ({userType})</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSendResetLink} disabled={loading || !email} style={styles.button}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
      {message.text && (
        <p style={{ ...styles.message, color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    marginBottom: "15px",
    textTransform: "capitalize",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default ForgotPassword;
