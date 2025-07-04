import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import Zones from './pages/Zones';
import Tickets from './pages/Tickets';
import Alerts from './pages/Alerts';
import ScanTicket from './pages/ScanTicket';
import { QRCodeSVG } from 'qrcode.react';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleLogin = (userObj) => {
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

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
                    <li><Link to="/zones">Zones</Link></li>
                    <li><Link to="/tickets">Tickets</Link></li>
                    <li><Link to="/alerts">Alerts</Link></li>
                    <li><Link to="/scan">Scan Ticket</Link></li>
                    {!user && <li><Link to="/login">Login</Link></li>}
                    {!user && <li><Link to="/register">Register</Link></li>}
                    {user && (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register onRegister={handleLogin} />} />
                    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
                    <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/admin" element={user && user.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />} />
                    <Route path="/zones" element={user ? <Zones /> : <Navigate to="/login" />} />
                    <Route path="/tickets" element={user ? <Tickets /> : <Navigate to="/login" />} />
                    <Route path="/alerts" element={user ? <Alerts /> : <Navigate to="/login" />} />
                    <Route path="/scan" element={user ? <ScanTicket /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;