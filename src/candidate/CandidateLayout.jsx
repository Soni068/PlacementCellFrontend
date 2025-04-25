import React from 'react'
import FooterComponent from '../components/FooterComponent'
import CandidateHeader from './CandidateHeader'

const CandidateLayout = ({children}) => {
  return (
    <div>
    <CandidateHeader />
    <main>{ children }</main>
    <FooterComponent />
    </div>
  )
}

export default CandidateLayout