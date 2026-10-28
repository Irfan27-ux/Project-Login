import { useState } from 'react';

export default function Navbar({ currentView, onNavigate, currentUser, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const username = currentUser?.email
    ? currentUser.email.split('@')[0]
    : '';

  const handleMobileNav = (view) => {
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  const handleMobileLogout = () => {
    setMobileMenuOpen(false);
    onLogout();
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          {/* Brand Logo */}
          <div className="nav-brand" onClick={() => handleMobileNav('home')}>
            <div className="brand-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div className="brand-text-col">
              <span className="brand-title">Course Center</span>
              <span className="brand-sub">Academy</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-links desktop-only">
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => onNavigate('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'courses' ? 'active' : ''}`}
                onClick={() => onNavigate('courses')}
              >
                Courses
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'about' ? 'active' : ''}`}
                onClick={() => onNavigate('about')}
              >
                About
              </button>
            </li>
          </ul>

          {/* Desktop Auth Section */}
          <div className="nav-auth desktop-only">
            {!currentUser ? (
              <button
                type="button"
                className={`btn btn-nav-login ${currentView === 'login' ? 'active' : ''}`}
                onClick={() => onNavigate('login')}
              >
                Sign In
              </button>
            ) : (
              <div className="nav-user-menu">
                <button
                  type="button"
                  className={`btn btn-nav-profile ${currentView === 'profile' ? 'active' : ''}`}
                  onClick={() => onNavigate('profile')}
                >
                  <span className="user-nav-avatar">{(username.charAt(0) || 'S').toUpperCase()}</span>
                  <span className="user-nav-name">{username}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-nav-logout"
                  onClick={onLogout}
                  title="Log Out"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="mobile-nav-toggle-wrap mobile-only">
            {!currentUser ? (
              <button
                type="button"
                className="btn btn-nav-login btn-nav-login-sm"
                onClick={() => handleMobileNav('login')}
              >
                Sign In
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-nav-profile btn-nav-profile-sm"
                onClick={() => handleMobileNav('profile')}
              >
                <span className="user-nav-avatar">{(username.charAt(0) || 'S').toUpperCase()}</span>
              </button>
            )}

            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Tray */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer mobile-only">
            <ul className="mobile-nav-list">
              <li>
                <button
                  type="button"
                  className={`mobile-nav-item ${currentView === 'home' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('home')}
                >
                  <span className="mobile-item-icon">🏠</span>
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`mobile-nav-item ${currentView === 'courses' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('courses')}
                >
                  <span className="mobile-item-icon">📚</span>
                  <span>Courses Catalog</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`mobile-nav-item ${currentView === 'about' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('about')}
                >
                  <span className="mobile-item-icon">ℹ️</span>
                  <span>About Us</span>
                </button>
              </li>

              <li className="mobile-divider"></li>

              {!currentUser ? (
                <li>
                  <button
                    type="button"
                    className={`mobile-nav-item mobile-auth-item ${currentView === 'login' ? 'active' : ''}`}
                    onClick={() => handleMobileNav('login')}
                  >
                    <span className="mobile-item-icon">🔑</span>
                    <span>Student Sign In / Sign Up</span>
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      type="button"
                      className={`mobile-nav-item mobile-auth-item ${currentView === 'profile' ? 'active' : ''}`}
                      onClick={() => handleMobileNav('profile')}
                    >
                      <span className="mobile-item-icon">👤</span>
                      <span>Student Dashboard ({username})</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="mobile-nav-item mobile-logout-item"
                      onClick={handleMobileLogout}
                    >
                      <span className="mobile-item-icon">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
