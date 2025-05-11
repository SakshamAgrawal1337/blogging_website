import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/auth-store';

const AdminSignInModal = ({ show, onClose, onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, error, clearError, users } = useContext(AuthContext);

  useEffect(() => {
    if (!show) {
      setUsername('');
      setPassword('');
      clearError();
    }
  }, [show, clearError]);

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      // Check if user exists and is admin
      if (!users[username] || users[username].role !== 'admin') {
        alert('Access denied. Admins only.');
        return;
      }
      const success = signIn(username, password);
      if (success) {
        onSignIn(username, password);
        onClose();
      } else {
        alert('Admin sign-in failed. Please check your credentials.');
      }
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1050,
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.3rem',
        width: '300px',
      }}>
        <h5>Admin Sign In</h5>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="adminUsername" className="form-label">Username</label>
            <input
              id="adminUsername"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adminPassword" className="form-label">Password</label>
            <input
              id="adminPassword"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignInModal;
