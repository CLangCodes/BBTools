import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavMenu.css';

function NavMenu() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleNav = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className={`navbar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
            <div className="container">
                <div className={`navbar-collapse collapse d-sm-inline-flex justify-content-between ${isExpanded ? 'show' : ''}`}>
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item nav-brand-item">
                            <button 
                                className="nav-collapse-toggle" 
                                onClick={toggleCollapse}
                                aria-label="Toggle navigation rail"
                            >
                                <i className={`bi bi-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
                            </button>
                            <NavLink className={`navbar-brand ${isCollapsed ? 'collapsed' : ''}`} to="/">
                                {!isCollapsed && "BBTools"}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${isCollapsed ? 'collapsed' : ''}`} to="/" end>
                                <i className="bi bi-house-door"></i>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${isCollapsed ? 'collapsed' : ''}`} to="/antigen-calculator">
                                <i className="bi bi-calculator"></i>
                                <span>Inventory Screen</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavMenu; 