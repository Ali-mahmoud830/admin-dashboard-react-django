import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { Users, Package, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    const auth = useContext(AuthContext);
    const [stats, setStats] = useState({ total_users: 0, total_products: 0, low_stock: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/dashboard/stats/');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-4">Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 style={{ marginBottom: '10px' }}>Dashboard Overview</h1>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>Welcome back, {auth?.user?.email || 'Admin'}</p>

            <div className="stats-grid">
                <div className="card stat-card">
                    <div className="stat-icon-wrapper blue">
                        <Users size={24} color="#2563eb" />
                    </div>
                    <div>
                        <p className="stat-label">Total Users</p>
                        <p className="stat-value">{stats.total_users}</p>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon-wrapper green">
                        <Package size={24} color="#16a34a" />
                    </div>
                    <div>
                        <p className="stat-label">Total Products</p>
                        <p className="stat-value">{stats.total_products}</p>
                    </div>
                </div>

                <div className="card stat-card">
                    <div className="stat-icon-wrapper orange">
                        <AlertTriangle size={24} color="#d97706" />
                    </div>
                    <div>
                        <p className="stat-label">Low Stock Items</p>
                        <p className="stat-value">{stats.low_stock}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
