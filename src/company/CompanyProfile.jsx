import React, { useState, useEffect } from 'react'
import CompanyLayout from './CompanyLayout'
import CompanySidebar from './CompanySidebar'
import axios from 'axios';

const CompanyProfile = () => {
    const companyName = localStorage.getItem('companyName');
    const companyEmail = localStorage.getItem('companyEmail');

    const [editMode, setEditMode] = useState(false);
    const [companyData, setCompanyData] = useState({
      name: '',
      email: '',
      description: '',
    });
    const [loading, setLoading] = useState(false);
  
    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/companies/${companyName}`);
        setCompanyData({
          name: response.data.name,
          email: response.data.email,
          description: response.data.description,
        });
      } catch (error) {
        console.error("Failed to fetch company details", error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleEditClick = () => {
      fetchCompanyDetails();
      setEditMode(true);
    };
  
    const handleChange = (e) => {
      setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };
  
    const handleSave = async () => {
      try {
        await axios.put(`http://localhost:8080/api/companies/update/${companyName}`, companyData);
        localStorage.setItem('companyName', companyData.name);
    localStorage.setItem('companyEmail', companyData.email);
        alert('Company details updated successfully!');
        setEditMode(false);
      } catch (err) {
        console.error('Failed to update company', err);
        alert('Failed to update company details.');
      }
    };
    
  return (
    <CompanyLayout>
        <CompanySidebar/>
        <div>
        

        {!editMode ? (
          <div className='right-content' align={'center'} style={{marginLeft: '980px'}}>
            <p style={{fontWeight : 'bold'}}>{companyName}</p>
            <p>{companyEmail}</p>
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
            </div>
         
        ) : (
          <div className="flex justify-center">
            <h3 className="text-xl font-bold underline text-center mb-4">Company Profile</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-1/2 border border-gray-300 shadow-lg rounded-md text-sm">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border p-2 font-semibold">Company Name</td>
                    <td className="border p-2"> <input
    type="text"
    name="name"
    value={companyData.name}
    readOnly
    disabled
    className="border p-1 w-full text-sm bg-gray-100 cursor-not-allowed"
  /></td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">Email</td>
                    <td className="border p-2">
                      <input
                        type="email"
                        name="email"
                        value={companyData.email}
                        onChange={handleChange}
                        className="border p-1 w-full text-sm"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border p-2 font-semibold">Description</td>
                    <td className="border p-2">
                      <textarea
                        name="description"
                        value={companyData.description}
                        onChange={handleChange}
                        className="border p-1 w-full text-sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {!loading && (
              <div className="text-center mt-4 ml-4">
                <button  style={{backgroundColor:"green"}}
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        )}
      </div>
        </CompanyLayout>
  )
}

export default CompanyProfile