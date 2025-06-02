import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import AntigenCalculator from './components/AntigenCalculator';
import Home from './components/Home';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <NavMenu />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/antigen-calculator" element={<AntigenCalculator />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
