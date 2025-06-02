import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

function NavMenu() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNav = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <NavLink className="navbar-brand" to="/">BBTools</NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleNav}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`navbar-collapse collapse d-sm-inline-flex justify-content-between ${isExpanded ? 'show' : ''}`}>
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/antigen-calculator">Antigen Calculator</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavMenu; 