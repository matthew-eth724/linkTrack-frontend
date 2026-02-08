import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/dashboard');
            setLinks(res.data);
        } catch (err) {
            setError('Failed to load dashboard stats');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-8">Loading stats...</div>;

    if (error) return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
            <button onClick={fetchStats} className="ml-4 underline">Retry</button>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Links</h2>
                <Link to="/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                    + Create Link
                </Link>
            </div>

            {links.length === 0 ? (
                <div className="text-gray-500 text-center py-12 bg-white rounded shadow">
                    No links yet. <Link to="/new" className="text-blue-600 underline">Create one!</Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Clicks</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Clicked</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {links.map((link) => (
                                    <tr key={link.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <a
                                                href={`/r/${link.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 font-medium hover:underline"
                                            >
                                                /r/{link.slug}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate text-gray-500" title={link.destination_url}>
                                            {link.destination_url}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                                            {link.total_clicks}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {link.unique_clicks}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                                            {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                                            {new Date(link.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
