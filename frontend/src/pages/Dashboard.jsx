import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/UI/Navbar';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        per_page: 10,
        page: 1
    });
    const [pagination, setPagination] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [filters]);

    const fetchUsers = async () => {
        try {
            const params = new URLSearchParams(filters);
            const res = await axios.get(`/admin/users?${params}`);
            setUsers(res.data.data.data);
            setPagination(res.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };


    const exportUsers = async () => {
        try {
            const response = await axios.get('/admin/users/export', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "Greška prilikom export-a.");
        }
    };


    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        
        try {
            await axios.delete(`/admin/users/${userId}`);
            fetchUsers();
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "Greška prilikom brisanja korisnika.");
        }
    };

    if (loading) return <div>Učitavanje...</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 pt-20">
                <div className="max-w-6xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6">Upravljaj kroisnicima</h1>
                    
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={filters.search}
                                onChange={(e) => setFilters({...filters, search: e.target.value, page: 1})}
                                className="border rounded px-3 py-2"
                            />
                            <select
                                value={filters.role}
                                onChange={(e) => setFilters({...filters, role: e.target.value, page: 1})}
                                className="border rounded px-3 py-2"
                            >
                                <option value="">Sve uloge</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <select
                                value={filters.per_page}
                                onChange={(e) => setFilters({...filters, per_page: e.target.value, page: 1})}
                                className="border rounded px-3 py-2"
                            >
                                <option value="5">5 po strani</option>
                                <option value="10">10 po strani</option>
                                <option value="20">20 po strani</option>
                            </select>
                        </div>
                    </div>



                    {/* Error message */}
                    {error && (
                        <div className="mt-4 mb-4 p-3 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {/* Users Table */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="px-6 py-3">Ime</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Uloga</th>
                                    <th className="px-6 py-3">Obriši</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b">
                                        <td className="px-6 py-4">{user.name}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.role}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Obriši
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            Prikaz {pagination.from} do {pagination.to} od ukupno {pagination.total} korisnika
                        </div>
                        <div className="flex gap-2">
                            {pagination.links?.map((link, index) => {
                                // Funkcija za izvlačenje broja stranice iz link.url
                                const getPageFromUrl = (url) => {
                                    if (!url) return null;
                                    const params = new URLSearchParams(url.split('?')[1]);
                                    return Number(params.get('page'));
                                };

                                const page = getPageFromUrl(link.url);

                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (page) setFilters({ ...filters, page });
                                        }}
                                        disabled={!link.url}
                                        className={`px-3 py-1 rounded ${
                                            link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <button
                        onClick={exportUsers}
                        className="bg-green-500 text-white mt-8 px-4 py-2 rounded hover:bg-green-600"
                    >
                        Export podatke kao CSV
                    </button>
                </div>
            </div>
        </>
    );
}