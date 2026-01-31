import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trash, Plus } from 'lucide-react';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', first_name: '', last_name: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/auth/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/auth/users/${id}/`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user', error);
            }
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/users/', newUser);
            setIsModalOpen(false);
            setNewUser({ username: '', email: '', password: '', first_name: '', last_name: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error creating user', error);
            alert('Failed to create user. Ensure username/email are unique.');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Users</h1>
                <button className="btn-primary" style={{ width: 'auto' }} onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} style={{ marginRight: '8px' }} />
                    Add User
                </button>
            </div>

            <div className="card table-responsive" style={{ marginTop: '20px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.is_staff ? 'Admin' : 'User'}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}>
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 style={{ marginBottom: '24px' }}>Create User</h2>
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-input" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-input" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-input" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input className="form-input" value={newUser.first_name} onChange={e => setNewUser({ ...newUser, first_name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input className="form-input" value={newUser.last_name} onChange={e => setNewUser({ ...newUser, last_name: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn-primary">Create</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-primary" style={{ backgroundColor: '#64748b' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
