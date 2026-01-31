import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const auth = useContext(AuthContext);

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/users', icon: <Users size={20} />, label: 'Users' },
        { path: '/products', icon: <Package size={20} />, label: 'Products' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>AdminPanel</h2>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button onClick={auth?.logout} className="nav-link logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
