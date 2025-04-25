import React, {useState} from 'react'
import CandidateLayout from './CandidateLayout'
import StudentSidebar from './StudentSidebar'
import './AddMarks.css'
const AddMarks = () => {
    const userId = localStorage.getItem('userId');

    const [marks, setMarks] = useState({
        marks10: '',
        marks12: '',
        marksUg: '',
        marksPg: ''
    });

    const [message, setMessage] = useState(''); 
    const[error, setError] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarks({
            ...marks,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extracting the values from the state
        const { marks10, marks12, marksUg, marksPg } = marks;
        const studentId = userId;  // Assuming 'userId' is already stored in localStorage

        // Construct the API URL with query parameters
        const apiUrl = `http://localhost:8080/api/student/updateMarks/${studentId}?marks10=${marks10}&marks12=${marks12}&marksUg=${marksUg}&marksPg=${marksPg}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                //const result = await response.json();
                //console.log('Marks updated successfully:', result);
                setMessage('Marks Submitted successfully!');
                // Optionally show a success message or redirect the user
            } else {
                console.error('Error updating marks:', response.statusText);
                setError('Error upating marks! Please try again')
                // Optionally show an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error upate marks! Please try again')
            // Optionally show an error message to the user
        }
    };
  return (
    <CandidateLayout>
        <StudentSidebar />
        <br/>
        <div align={'center'}>
            <form className='form-7' onSubmit={handleSubmit}> 
                <div>
            <label>Student ID:</label>
                    <input
                        type="text" readOnly
                        value={userId}
                       
                        required
                    />
                </div>
                <div>
                    <label>10th Marks:</label>
                    <input
                        type="number"
                        name="marks10"
                            value={marks.marks10}
                            onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>12th Marks:</label>
                    <input
                        type="number"
                        name="marks12"
                        value={marks.marks12}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>UG Marks:</label>
                    <input
                        type="number"
                        name="marksUg"
                        value={marks.marksUg}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>PG Marks:</label>
                    <input
                        type="number" 
                        name="marksPg"
                            value={marks.marksPg}
                            onChange={handleChange}
                        
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
                <button type="submit">Submit Marks</button>
                
            </form>
        </div><br/><br/><br/><br/>
    </CandidateLayout>

  )
}

export default AddMarks