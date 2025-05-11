import './App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import PostListProvider from './store/post-list-store';
import SignInModal from './components/SignInModal';
import AdminSignInModal from './components/AdminSignInModal';
import SignUpModal from './components/SignUpModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import AdminDashboard from './components/AdminDashboard';
import { useState, useContext, useEffect } from 'react';
import { AuthProvider, AuthContext } from './store/auth-store';

function App() {
  const [selectedTab, setSelectedTab] = useState(() => {
    return localStorage.getItem('selectedTab') || "Home";
  });
  const [searchTag, setSearchTag] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAdminSignInModal, setShowAdminSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { isSignedIn, role, signIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("DEBUG: isSignedIn =", isSignedIn, "role =", role);
    if (isSignedIn && selectedTab === "Home") {
      setSelectedTab("Create Post");
    }
  }, [isSignedIn, selectedTab, role]);

  useEffect(() => {
    localStorage.setItem('selectedTab', selectedTab);
  }, [selectedTab]);

  const handleAdminSignIn = (username, password) => {
    const success = signIn(username, password);
    if (success) {
      setShowAdminSignInModal(false);
      setSelectedTab("Admin");
    } else {
      alert("Admin sign-in failed. Please check your credentials.");
    }
  };

  return (
    <AuthProvider>
      <PostListProvider>
        <div className="app-container">
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <div className='content-container'>
            <>
              <Header
                searchTag={searchTag}
                setSearchTag={setSearchTag}
                onLoginClick={() => setShowSignInModal(true)}
                onAdminLoginClick={() => setShowAdminSignInModal(true)}
                onSignUpClick={() => setShowSignUpModal(true)}
              />
              {selectedTab === "Home" ? (
                <PostList searchTag={searchTag} />
              ) : selectedTab === "Admin" ? (
                <AdminDashboard />
                // isSignedIn =='true' && role == 'admin' ? (
                //   <AdminDashboard />
                // ) : (
                //   <div className="text-center mt-4">
                //     <p>Access denied. Admins only.</p>
                //   </div>
                // )
              ) : (
                <CreatePost />
              )}
              <Footer />
              <SignInModal
                show={showSignInModal}
                onClose={() => setShowSignInModal(false)}
                onSignIn={(user) => {
                  signIn(user);
                  setShowSignInModal(false);
                }}
                onForgotPasswordClick={() => {
                  setShowSignInModal(false);
                  setShowForgotPasswordModal(true);
                }}
              />
              <AdminSignInModal
                show={showAdminSignInModal}
                onClose={() => setShowAdminSignInModal(false)}
                onSignIn={handleAdminSignIn}
              />
              <SignUpModal
                show={showSignUpModal}
                onClose={() => setShowSignUpModal(false)}
                onSignUp={(user) => {
                  signIn(user);
                  setShowSignUpModal(false);
                }}
              />
              <ForgotPasswordModal
                show={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
              />
            </>
          </div>
        </div>
      </PostListProvider>
    </AuthProvider>
  )
}

export default App;
