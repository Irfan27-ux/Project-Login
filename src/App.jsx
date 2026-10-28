import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/Courses';
import { COURSES_DATA } from './data/coursesData';
import About from './components/About';
import LoginForm from './components/LoginForm';
import UserDetails from './components/UserDetails';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([
    COURSES_DATA[0],
    COURSES_DATA[1],
  ]);

  const handleNavigate = (view) => {
    // If user is logged out and tries to view profile, route to login
    if (view === 'profile' && !currentUser) {
      setCurrentView('login');
      return;
    }
    // If user is already logged in and clicks login, show profile details
    if (view === 'login' && currentUser) {
      setCurrentView('profile');
      return;
    }
    setCurrentView(view);
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = (formData) => {
    if (!formData) return;
    const user = {
      name: formData.name || '',
      email: formData.email || 'student@coursecenter.edu',
      password: formData.password || '',
      isNewAccount: formData.isNewAccount || false,
      loginTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    setCurrentUser(user);
    // Immediately display user details upon login
    setCurrentView('profile');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleEnroll = (course) => {
    setEnrolledCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (!exists) {
        return [...prev, course];
      }
      return prev;
    });
  };

  return (
    <div className="website-container">
      {/* Course Center Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="website-main">
        {currentView === 'home' && (
          <Home
            onNavigate={handleNavigate}
            currentUser={currentUser}
          />
        )}

        {currentView === 'courses' && (
          <Courses
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onEnroll={handleEnroll}
            enrolledCourses={enrolledCourses}
          />
        )}

        {currentView === 'about' && (
          <About />
        )}

        {currentView === 'login' && (
          <div className="auth-view-wrapper">
            <LoginForm onLogin={handleLogin} />
          </div>
        )}

        {currentView === 'profile' && currentUser && (
          <div className="auth-view-wrapper">
            <UserDetails
              user={currentUser}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              enrolledCourses={enrolledCourses}
            />
          </div>
        )}
      </main>

      {/* Course Center Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* AI Assistant Chatbot */}
      <AIChatbot onNavigate={handleNavigate} currentUser={currentUser} />
    </div>
  );
}

export default App;
