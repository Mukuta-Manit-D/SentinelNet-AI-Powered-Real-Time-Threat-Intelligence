import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import AdminPanel from './pages/AdminPanel';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                    <li><Link to="/support">Support</Link></li>
                    <li><Link to="/admin">Admin Panel</Link></li>
                </ul>
            </nav>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;