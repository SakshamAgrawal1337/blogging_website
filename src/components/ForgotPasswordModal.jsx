import React, { useState } from 'react';

const ForgotPasswordModal = ({ show, onClose }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameOrEmail.trim()) {
      // It Sets Dummy password reset logic
      setMessage(`If an account with "${usernameOrEmail}" exists, a password reset link has been sent.`);
    } else {
      alert('Please enter your username or email');
    }
  };

  const handleClose = () => {
    setUsernameOrEmail('');
    setMessage('');
    onClose();
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
        <h5>Forgot Password</h5>
        {message && <div className="alert alert-success" role="alert">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
            <input
              id="usernameOrEmail"
              type="text"
              className="form-control"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary">Send Reset Link</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={handleClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
