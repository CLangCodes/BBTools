import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

function NavMenu() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNav = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">BBTools</Link>
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
                            <Link className="nav-link text-dark" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/antigen-calculator">Antigen Calculator</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavMenu; 