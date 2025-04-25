import React from 'react'
import FooterComponent from '../components/FooterComponent'
import PlacementHeader from './PlacementHeader'
import "./Dashboard"
const Layout = ({ children }) => {
  return (
    <div>
        <PlacementHeader />
        
        <main>{ children }</main>
        <FooterComponent />
    </div>
  )
}

export default Layout