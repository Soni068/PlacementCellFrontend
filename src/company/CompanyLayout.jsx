import React from 'react'
import CompanyHeader from './CompanyHeader'
import FooterComponent from '../components/FooterComponent'
const CompanyLayout = ({children}) => {
  return (
    <div>
    <CompanyHeader />
    <main>{ children }</main>
    <FooterComponent />
    </div>
   
  )
}

export default CompanyLayout