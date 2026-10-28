import { useState } from 'react';

export default function Footer({ onNavigate }) {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailSub('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="website-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col-brand">
            <div className="footer-logo-row">
              <span className="footer-logo-icon">🎓</span>
              <span className="footer-logo-text">Course Center</span>
            </div>
            <p className="footer-bio-text">
              Industry-standard technical training designed to elevate your programming, data science, and design skills.
            </p>
            <div className="footer-accreditation">
              <span>Verified Educational Platform &bull; Est. 2024</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col-links">
            <h4>Quick Navigation</h4>
            <ul>
              <li><button onClick={() => onNavigate('home')}>Home</button></li>
              <li><button onClick={() => onNavigate('courses')}>All Courses</button></li>
              <li><button onClick={() => onNavigate('about')}>About Faculty</button></li>
              <li><button onClick={() => onNavigate('login')}>Student Sign In</button></li>
            </ul>
          </div>

          {/* Featured Tracks */}
          <div className="footer-col-links">
            <h4>Popular Tracks</h4>
            <ul>
              <li><button onClick={() => onNavigate('courses')}>Full-Stack Web Bootcamp</button></li>
              <li><button onClick={() => onNavigate('courses')}>Python & Data Science</button></li>
              <li><button onClick={() => onNavigate('courses')}>UI/UX Design Masterclass</button></li>
              <li><button onClick={() => onNavigate('courses')}>Cloud & DevOps</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="footer-col-newsletter">
            <h4>Course Center Newsletter</h4>
            <p>Get weekly free tutorials, coding challenges, and career tips directly in your inbox.</p>
            {subscribed ? (
              <div className="newsletter-success">✓ Thank you for subscribing!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="btn btn-primary btn-newsletter">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>&copy; {new Date().getFullYear()} Course Center. All rights reserved.</p>
          <div className="footer-legal-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
