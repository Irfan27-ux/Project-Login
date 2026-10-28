import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleModeSwitch = (mode) => {
    setAuthMode(mode);
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const emailValue = formData.email.trim();
    const passwordValue = formData.password.trim();

    if (authMode === 'signin') {
      if (!emailValue) {
        setError('Please enter your email or username.');
        return;
      }
      if (!passwordValue) {
        setError('Please enter your password.');
        return;
      }

      setError('');
      if (typeof onLogin === 'function') {
        onLogin({
          email: emailValue,
          password: passwordValue,
          rememberMe,
        });
      }
    } else {
      // Sign Up validation
      const nameValue = formData.name.trim();
      const confirmPasswordValue = formData.confirmPassword.trim();

      if (!nameValue) {
        setError('Please enter your full name.');
        return;
      }

      if (!emailValue || !emailValue.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }

      if (passwordValue.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      if (passwordValue !== confirmPasswordValue) {
        setError('Passwords do not match. Please re-enter.');
        return;
      }

      if (!agreeTerms) {
        setError('Please agree to the student terms to create an account.');
        return;
      }

      setError('');
      setSuccessMsg('Account created successfully! Logging you in...');

      setTimeout(() => {
        if (typeof onLogin === 'function') {
          onLogin({
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            isNewAccount: true,
          });
        }
      }, 400);
    }
  };

  const handleQuickFill = () => {
    setFormData((prev) => ({
      ...prev,
      email: 'student@coursecenter.edu',
      password: 'password123',
    }));
    setError('');
  };

  return (
    <div className="auth-card-container">
      <div className="card auth-card">
        {/* Sign In vs Sign Up Toggle Switch */}
        <div className="auth-tab-switch">
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-header">
          <div className="auth-icon-badge">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <h2>{authMode === 'signin' ? 'Student Sign In' : 'Create Student Account'}</h2>
          <p>
            {authMode === 'signin'
              ? 'Enter your credentials to access your course dashboard.'
              : 'Join Course Center today to enroll and track your learning progress.'}
          </p>
        </div>

        {error && (
          <div className="error-alert" role="alert">
            <span className="error-alert-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="success-alert" role="alert">
            <span className="success-alert-icon">🎉</span>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-body" noValidate>
          {/* Full Name for Sign Up */}
          {authMode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <span className="input-adornment">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Johnson"
                  autoComplete="name"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email">
              {authMode === 'signin' ? 'Email Address or Username' : 'Email Address'}
            </label>
            <div className="input-with-icon">
              <span className="input-adornment">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={authMode === 'signin' ? 'e.g. student@coursecenter.edu' : 'name@example.com'}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              {authMode === 'signin' ? 'Password' : 'Create Password (min 6 chars)'}
            </label>
            <div className="input-with-icon">
              <span className="input-adornment">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={authMode === 'signin' ? 'Enter your password' : 'Create a secure password'}
                autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="btn-toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password for Sign Up */}
          {authMode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <span className="input-adornment">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="btn-toggle-eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Options Row */}
          {authMode === 'signin' ? (
            <div className="form-row-between">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember my session</span>
              </label>

              <button
                type="button"
                className="btn-quick-fill-hint"
                onClick={handleQuickFill}
              >
                Auto-fill sample
              </button>
            </div>
          ) : (
            <div className="form-row-between">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the Student Terms</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-submit-auth"
          >
            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Bottom Switcher Helper */}
        <div className="auth-card-footer">
          {authMode === 'signin' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                className="btn-switch-auth-link"
                onClick={() => handleModeSwitch('signup')}
              >
                Sign Up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="btn-switch-auth-link"
                onClick={() => handleModeSwitch('signin')}
              >
                Sign In here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
