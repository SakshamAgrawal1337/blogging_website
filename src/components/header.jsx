import { useContext, useState } from 'react';
import React from 'react';
import { AuthContext } from '../store/auth-store';
import DarkModeToggle from './DarkModeToggle';


const Header = ({ searchTag, setSearchTag, onLoginClick, onSignUpClick, onAdminLoginClick }) => {
  const { isSignedIn, username, signOut } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <header className="p-3 text-bg-dark ">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
            <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
            <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={handleSubmit}>
            <input
                type="search"
                className="form-control form-control-dark text-bg-dark placeholder-white"
                placeholder="Search by tag..."
                aria-label="Search"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                style={{ width: '300px' }}
              />

          </form>

          <div className="text-end">
            {isSignedIn ? (
              <>
                <span className="text-white me-3">Hello, {username}</span>
                 
                <button type="button" className="btn btn-outline-light me-2" onClick={signOut}>Logout</button>
              </>
            ) : (
              <>
                <div className="btn-group me-2">
<button type="button" className="btn btn-outline-light dropdown-toggle" aria-expanded="false">
  Login
</button>
                  <ul className="dropdown-menu dropdown-menu-end" style={{ border : "0.5 px solid black" }}>
                    <li><button className="dropdown-item" type="button" onClick={onLoginClick}>User Login</button></li>
                    <li><button className="dropdown-item" type="button" onClick={onAdminLoginClick}>Admin Login</button></li>
                  </ul>
                </div>
                <button type="button" className="btn btn-warning" onClick={onSignUpClick}>Sign-up</button>
                
              </>
            )}
          </div>
          <div className="ms-3">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
