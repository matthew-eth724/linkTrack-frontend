import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateLink from './pages/CreateLink';

// Simple context or prop drill for auth
const AuthCheck = ({ children }) => {
    const [password, setPassword] = useState(localStorage.getItem('dashboard_password') || '');
    const [authenticated, setAuthenticated] = useState(!!password);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('dashboard_password', password);
        setAuthenticated(true);
    };

    if (!authenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-xl font-bold mb-4">Enter Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded mb-4"
                        placeholder="Secret..."
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
                </form>
            </div>
        );
    }

    return children;
};

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-600">LinkTrack</h1>
                <div className="space-x-4">
                    <Link to="/" className={`hover:text-blue-500 ${location.pathname === '/' ? 'text-blue-700 font-semibold' : ''}`} >Dashboard</Link>
                    <Link to="/new" className={`hover:text-blue-500 ${location.pathname === '/new' ? 'text-blue-700 font-semibold' : ''}`}>+ New Link</Link>
                    <button onClick={() => {
                        localStorage.removeItem('dashboard_password');
                        window.location.reload();
                    }} className="text-red-500 text-sm">Logout</button>
                </div>
            </nav>
            <main className="p-8 max-w-5xl mx-auto">
                {children}
            </main>
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AuthCheck>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/new" element={<CreateLink />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Layout>
            </AuthCheck>
        </BrowserRouter>
    );
}

export default App;
