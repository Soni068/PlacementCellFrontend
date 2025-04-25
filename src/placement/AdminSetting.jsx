import React from 'react'
import Layout from './Layout'
import Sidebar from './Sidebar'

const AdminSetting = () => {
  return (
    <Layout>
        <Sidebar /><br/><br/><br/><br/><br/><br/>
        <div className='right-content' align={'center'}>
            <a href="#">Change Password</a><hr/>
            <a href="AdminSetting/TeamMembers">Add Team Members</a><hr/>
            <a href="AdminSetting/ViewMembers">View Team Members</a>
        </div>
        </Layout>
  )
}

export default AdminSetting