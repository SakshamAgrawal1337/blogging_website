import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/auth-store';
import { PostList } from '../store/post-list-store';
import { FaUserPlus, FaRegEdit, FaTrashAlt } from 'react-icons/fa';  // Added icons

const AdminDashboard = () => {
  const { users, addAdmin, error, clearError, updateUser } = useContext(AuthContext);
  const { postList, deletePost } = useContext(PostList);

  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('user');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    clearError();
    const success = addAdmin(newAdminUsername, newAdminEmail, newAdminPassword);
    if (success) {
      setMessage(`Admin ${newAdminUsername} added successfully.`);
      setNewAdminUsername('');
      setNewAdminEmail('');
      setNewAdminPassword('');
    } else {
      setMessage(error);
    }
  };

  const boxStyleBase = {
    cursor: 'pointer',
    width: '30%',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '150px',
    height: '150px',
    marginRight: '10px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    userSelect: 'none',
    borderRadius: '0.25rem',
    color: 'white',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', 
    transition: 'transform 0.3s ease, background-color 0.3s ease', 
  };

  const hoverBoxStyle = {
    transform: 'scale(1.05)', 
  };

  const sections = [
    {
      key: 'users',
      label: 'Users',
      boxStyle: { backgroundColor: '#007bff' },
      content: () => (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(users).map(([username, data]) => (
                <tr key={username}>
                  <td>{username}</td>
                  <td>{data.email}</td>
                  <td>{data.role || 'user'}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => {
                      setEditingUser(username);
                      setEditEmail(data.email);
                      setEditRole(data.role || 'user');
                      setMessage('');
                    }}><FaRegEdit /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingUser && (
            <div className="card p-3 mt-3">
              <h4>Edit User: {editingUser}</h4>
              <form onSubmit={(e) => {
                e.preventDefault();
                clearError();
                const success = updateUser(editingUser, editEmail, editRole);
                if (success) {
                  setMessage(`User ${editingUser} updated successfully.`);
                  setEditingUser(null);
                } else {
                  setMessage(error);
                }
              }}>

                <div className="mb-3">
                  <label htmlFor="editEmail" className="form-label">Email</label>
                  <input
                    type="email"
                    id="editEmail"
                    className="form-control"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editRole" className="form-label">Role</label>
                  <select
                    id="editRole"
                    className="form-select"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>Cancel</button>
              </form>
            </div>
          )}
        </>
      ),
    },
    {
      key: 'posts',
      label: 'Posts',
      boxStyle: { backgroundColor: '#28a745' },
      content: () => (
        <>
          {postList.map(post => (
            <div key={post.id} className="card mb-3">
              <div className="card-header">
                Posted by: user_{post.userId} | Date: {post.publishDate || post.publishdate || post.date || 'N/A'}
              </div>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body || post.description || ''}</p>
                <button className="btn btn-danger btn-sm" onClick={() => deletePost(post.id)}><FaTrashAlt /></button>
              </div>
            </div>
          ))}
        </>
      ),
    },
    {
      key: 'addAdmin',
      label: 'Add New Admin',
      boxStyle: { backgroundColor: '#ffc107', color: 'black' },
      content: () => (
        <form onSubmit={handleAddAdmin}>
          <div className="mb-3">
            <label htmlFor="adminUsername" className="form-label">Username</label>
            <input
              type="text"
              id="adminUsername"
              className="form-control"
              value={newAdminUsername}
              onChange={(e) => setNewAdminUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adminEmail" className="form-label">Email</label>
            <input
              type="email"
              id="adminEmail"
              className="form-control"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adminPassword" className="form-label">Password</label>
            <input
              type="password"
              id="adminPassword"
              className="form-control"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Admin</button>
          {message && <div className="mt-3 alert alert-info">{message}</div>}
        </form>
      ),
    },
  ];

  return (
    <div className="admin-dashboard container mt-4">
      <h2>Admin Dashboard</h2>

      {/* Boxes Row */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap' }}>
        {sections.map(({ key, label, boxStyle }) => (
          <div
            key={key}
            className="functionality-box"
            style={{ ...boxStyleBase, ...boxStyle }}
            onClick={() => toggleSection(key)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Expanded Content Section */}
      {sections.map(({ key, content }) => (
        expandedSection === key && (
          <section key={key} className="mb-4">
            {content()}
          </section>
        )
      ))}
    </div>
  );
};

export default AdminDashboard;
