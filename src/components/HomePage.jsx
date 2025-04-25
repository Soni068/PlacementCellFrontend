import React from 'react'
import { Layout } from './Layout'
import './HomePage.css';

const HomePage = () => {
  return (
    <Layout>
    <div className="homepage">
        {/* Hero Section with Background Image */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Placement Portal</h1>
            <p>Your one-stop solution for student placements and recruiter hiring.</p>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>For Students</h3>
              <p>Find your dream job by applying to top recruiters and manage your applications with ease.</p>
            </div>
            <div className="feature-item">
              <h3>For Recruiters</h3>
              <p>Post job opportunities, filter candidates, and hire the best talent effortlessly.</p>
              
            </div>
            <div className="feature-item">
              <h3>Easy Management</h3>
              <p>Seamlessly track and manage placements, interviews, and job postings.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta">
          <h2>Ready to Start?</h2>
          <p>Join us today and take your career or hiring process to the next level.</p>
          <a href="/RecruitersHome" className="btn">Join as Recruiter</a>
          <a href="/StudentsHome" className="btn">Join as Student</a>
        </section>
      </div><br/><br/><br/>
    </Layout>
  )
}

export default HomePage