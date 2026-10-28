export default function UserDetails({ user, onLogout, onNavigate, enrolledCourses = [] }) {
  const emailStr = user?.email || 'student@coursecenter.edu';
  const username = emailStr.includes('@') ? emailStr.split('@')[0] : emailStr;
  const displayName = user?.name || username;
  const initial = (displayName.charAt(0) || 'S').toUpperCase();

  // Deterministic student ID based on email string
  const studentId = `STU-${Math.abs(emailStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000) % 9000 + 1000)}`;
  const loginTimestamp = user?.loginTime || new Date().toLocaleTimeString();

  return (
    <div className="student-dashboard-container">
      {user?.isNewAccount && (
        <div className="success-banner" style={{ margin: '0 0 1.5rem 0', textAlign: 'left' }}>
          🎉 <strong>Account created successfully!</strong> Welcome to Course Center, {displayName}. Your student portal is now ready.
        </div>
      )}

      {/* Dashboard Header Banner */}
      <div className="dashboard-header-card">
        <div className="dashboard-user-row">
          <div className="student-avatar-box">
            <span className="student-avatar-char">{initial}</span>
            <span className="online-dot" title="Active"></span>
          </div>

          <div className="student-meta-col">
            <div className="student-name-row">
              <h2>Welcome, {displayName}!</h2>
              <span className="student-status-badge">Active Student</span>
            </div>
            <p className="student-email-line">
              <span>{emailStr}</span> &bull; <span className="student-id-tag">ID: {studentId}</span>
            </p>
          </div>

          <div className="header-action-group">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('courses')}
              className="btn btn-secondary btn-sm"
            >
              Browse Catalog
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="btn btn-outline-danger btn-sm"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Quick Progress Metrics */}
        <div className="dashboard-metrics-strip">
          <div className="strip-metric-item">
            <span className="strip-num">{enrolledCourses.length}</span>
            <span className="strip-label">Enrolled Courses</span>
          </div>
          <div className="strip-metric-item">
            <span className="strip-num">48%</span>
            <span className="strip-label">Average Completion</span>
          </div>
          <div className="strip-metric-item">
            <span className="strip-num">1</span>
            <span className="strip-label">Completed Certifications</span>
          </div>
          <div className="strip-metric-item">
            <span className="strip-num">{loginTimestamp}</span>
            <span className="strip-label">Login Timestamp</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="dashboard-grid-layout">
        {/* Left Column: Enrolled Courses List */}
        <div className="dashboard-main-card">
          <div className="card-top-bar">
            <div>
              <h3>My Active Courses ({enrolledCourses.length})</h3>
              <p className="card-sub-hint">Continue learning where you left off</p>
            </div>
            {onNavigate && (
              <button
                type="button"
                className="btn-add-course"
                onClick={() => onNavigate('courses')}
              >
                + Add Course
              </button>
            )}
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="empty-courses-state">
              <span className="empty-book-icon">📚</span>
              <p>You have not enrolled in any courses yet.</p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => onNavigate && onNavigate('courses')}
              >
                Explore Courses Now
              </button>
            </div>
          ) : (
            <div className="enrolled-courses-flow">
              {enrolledCourses.map((c) => {
                const progressPct = c.progress || 50;

                return (
                  <div key={c.id} className="enrolled-course-card">
                    <div className="enrolled-course-header">
                      <div className="course-title-group">
                        <span className="course-mini-icon">{c.icon || '💻'}</span>
                        <div>
                          <h4>{c.title}</h4>
                          <span className="course-instructor-text">Instructor: {c.instructor} &bull; {c.duration}</span>
                        </div>
                      </div>
                      <span className="progress-pct-badge">{progressPct}% Complete</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${progressPct}%`, backgroundColor: c.color || '#3b82f6' }}
                      ></div>
                    </div>

                    <div className="enrolled-course-footer">
                      <span className="lessons-left">📖 {c.lessons}</span>
                      <button
                        type="button"
                        className="btn btn-primary btn-resume"
                        onClick={() => alert(`Resuming module for "${c.title}"!`)}
                      >
                        Resume Learning &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Student Profile Details */}
        <div className="dashboard-side-card">
          <div className="side-card-header">
            <h3>Account Information</h3>
            <span className="verified-check" title="Verified">&#10003; Verified</span>
          </div>

          <div className="info-rows-list">
            {user?.name && (
              <div className="info-row">
                <span className="info-key">Full Name</span>
                <span className="info-val">{user.name}</span>
              </div>
            )}

            <div className="info-row">
              <span className="info-key">Email Address</span>
              <span className="info-val">{emailStr}</span>
            </div>

            <div className="info-row">
              <span className="info-key">Username</span>
              <span className="info-val font-mono">@{username}</span>
            </div>

            <div className="info-row">
              <span className="info-key">Student ID</span>
              <span className="info-val font-mono">{studentId}</span>
            </div>

            <div className="info-row">
              <span className="info-key">Login Time</span>
              <span className="info-val">{loginTimestamp}</span>
            </div>

            <div className="info-row">
              <span className="info-key">Enrollment Standing</span>
              <span className="info-val standing-good">Enrolled (Good Standing)</span>
            </div>

            <div className="info-row">
              <span className="info-key">Session Status</span>
              <span className="info-val status-online">&#9679; Active Session</span>
            </div>
          </div>

          <div className="support-callout-box">
            <h4>Need Academic Guidance?</h4>
            <p>Our course advisors are available to help you plan your learning schedule.</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate && onNavigate('about')}
            >
              Contact Student Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
