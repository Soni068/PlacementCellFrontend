import React from 'react'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'

export const Layout = ({ children }) => {
  return (
    <div>
        <HeaderComponent />
        <main>{ children }</main>
        <FooterComponent />
    </div>
  )
}
