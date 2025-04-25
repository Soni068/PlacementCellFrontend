import React from 'react'
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Sidebar from './Sidebar';
import './Students.css'

const Students = () => {
  const navigate = useNavigate();

  const handleRegisteredStudentsClick = () => {
    navigate('/placement/StudentsList');  // Navigate to the Registered Students page
  };

  const handleNotPlacedClick = () => {
    navigate('/placement/NotPlaced');  // Navigate to the Registered Students page
  };

  const handlePlacedClick = () => {
    navigate('/placement/Placed');  // Navigate to the Registered Students page
  };
  
  return (
    <Layout >
        <Sidebar />
            <div className="dashboard-container">
              
                <button className="btn-1" type="submit" onClick={handleRegisteredStudentsClick}>Registered Students</button>
                <button className="btn-2" type="submit" onClick={handlePlacedClick}>Placed Students</button>
                <button className="btn-3" type="submit" onClick={handleNotPlacedClick}>Not Placed Students</button>
                
         </div>
        
    </Layout>
)
}

export default Students