import React from 'react'
import './HeaderComponent.css'
import logo from './bv-logo.png';
const HeaderComponent = () => {
  return (
    <div>
        <header>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <a className="App-logo" href="#"><img src={logo} alt="Logo"/></a>
        
                
                <div className="navbar-links">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/StudentsHome">Students</a></li>
                        <li><a href="/RecruitersHome">Recruiters</a></li>
                        <li><a href="/OurTeam">Our Team</a></li>
                        <li><a href="#contact">Placements</a></li>
                        <li><a href="/Contact">Contact Us</a></li>
                    </ul>
                </div>
                </nav>
            </div>
        </header>
        
    </div>
  )
}

export default HeaderComponent