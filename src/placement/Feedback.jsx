import React from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'

const Feedback = () => {
  return (
    <Layout>
        <Sidebar />
        <div className='right-content'  align={'center'} style={{marginLeft: '980px'}}>
        <button
            style={{
              backgroundColor: 'green',
              color: 'white',
              width: '100%',
              padding: '10px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Student's Feedback
          </button>
            <br/><br/>
          <button
            style={{
              backgroundColor: '#0a500d',
              color: 'white',
              width: '100%',
              padding: '10px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Recruiter's Feedback
          </button>
        </div>
        </Layout>
  )
}

export default Feedback