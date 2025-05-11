import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/auth-store';

const SignUpModal = ({ show, onClose, onSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, error, clearError } = useContext(AuthContext);

  useEffect(() => {
    if (!show) {
      setUsername('');
      setEmail('');
      setPassword('');
      clearError();
    }
  }, [show, clearError]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && email.trim() && password.trim()) {
      const success = signUp(username, email, password);
      if (success) {
        onSignUp(username);
        onClose();
      }
    } else {
      alert('Please fill in all fields');
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
        <h5>Sign Up</h5>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="signup-username" className="form-label">Username</label>
            <input
              id="signup-username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signup-email" className="form-label">Email</label>
            <input
              id="signup-email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="signup-password" className="form-label">Password</label>
            <input
              id="signup-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
