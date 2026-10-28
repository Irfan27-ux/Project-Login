import { COURSES_DATA } from '../data/coursesData';

export default function Home({ onNavigate, currentUser }) {
  const featuredCourses = COURSES_DATA.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-announcement-pill">
              <span className="pill-dot"></span>
              <span>New Cohorts Open for Enrollment</span>
              <span className="pill-arrow">&rarr;</span>
            </div>

            <h1 className="hero-headline">
              Master In-Demand Skills. <br />
              <span className="gradient-text">Build Your Future.</span>
            </h1>

            <p className="hero-subtext">
              Learn full-stack programming, data science, and UI/UX design from industry practitioners through structured, project-driven training.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary btn-hero"
                onClick={() => onNavigate('courses')}
              >
                Browse Course Catalog &rarr;
              </button>
              {!currentUser ? (
                <button
                  className="btn btn-secondary btn-hero"
                  onClick={() => onNavigate('login')}
                >
                  Student Login
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-hero"
                  onClick={() => onNavigate('profile')}
                >
                  Open Student Portal
                </button>
              )}
            </div>

            {/* Social Proof */}
            <div className="hero-social-proof">
              <div className="avatar-group">
                <span className="avatar-circle av-1">👨‍💻</span>
                <span className="avatar-circle av-2">👩‍🔬</span>
                <span className="avatar-circle av-3">🧑‍🎨</span>
                <span className="avatar-circle av-4">👩‍💻</span>
              </div>
              <div className="proof-text">
                <div className="proof-stars">★★★★★ <strong>4.9 / 5.0</strong></div>
                <span>Trusted by over 12,500 ambitious students worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="metrics-section">
        <div className="metrics-container">
          <div className="metric-card">
            <div className="metric-icon-box blue-box">📚</div>
            <div className="metric-text-col">
              <span className="metric-num">50+</span>
              <span className="metric-label">Certified Courses</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-box purple-box">🎓</div>
            <div className="metric-text-col">
              <span className="metric-num">12,500+</span>
              <span className="metric-label">Active Learners</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-box green-box">💼</div>
            <div className="metric-text-col">
              <span className="metric-num">95%</span>
              <span className="metric-label">Placement Rate</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon-box amber-box">⭐</div>
            <div className="metric-text-col">
              <span className="metric-num">4.9 / 5.0</span>
              <span className="metric-label">Student Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="section-container">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">Top Rated Programs</span>
            <h2 className="section-title">Explore Featured Courses</h2>
            <p className="section-subtitle">Jump straight into our most popular and career-transforming tracks.</p>
          </div>
          <button
            className="btn btn-secondary btn-view-all"
            onClick={() => onNavigate('courses')}
          >
            All Courses &rarr;
          </button>
        </div>

        <div className="courses-grid">
          {featuredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-thumbnail" style={{ background: `linear-gradient(135deg, ${course.color}15, ${course.color}25)` }}>
                <span className="course-thumb-icon">{course.icon}</span>
                <span className="course-badge" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                  {course.badge}
                </span>
              </div>

              <div className="course-card-body">
                <div className="course-meta-top">
                  <span className="course-category-tag">{course.category}</span>
                  <span className="course-level-tag">{course.level}</span>
                </div>

                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>

                <div className="course-stats-line">
                  <span>⏱️ {course.duration}</span>
                  <span>📖 {course.lessons}</span>
                  <span className="rating-pill">⭐ {course.rating}</span>
                </div>

                <div className="course-card-footer">
                  <div className="instructor-mini">
                    <span className="instructor-avatar">👨‍🏫</span>
                    <div className="instructor-info">
                      <span className="instructor-name">{course.instructor}</span>
                      <span className="instructor-role">{course.role}</span>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onNavigate('courses')}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Pillars */}
      <section className="pillars-section">
        <div className="pillars-container">
          <div className="section-header-center">
            <span className="section-eyebrow">The Course Center Advantage</span>
            <h2 className="section-title">Why Ambitious Learners Choose Us</h2>
            <p className="section-subtitle">We focus on hands-on application so you graduate job-ready.</p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box">💻</div>
              <h3>Real-World Project Labs</h3>
              <p>
                Every module concludes with building an actual production project that directly enhances your professional portfolio.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">👥</div>
              <h3>1-on-1 Mentor Guidance</h3>
              <p>
                Get personal code reviews, architecture advice, and career coaching from active engineers and tech leads.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-box">📜</div>
              <h3>Accredited Certifications</h3>
              <p>
                Earn verifiable digital credentials and shareable diplomas to demonstrate your verified mastery on LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Graduate Testimonial Card */}
      <section className="testimonial-section">
        <div className="testimonial-card">
          <div className="quote-mark">“</div>
          <p className="quote-text">
            "Course Center was the turning point in my transition into tech. The curriculum is clear, updated, and practical.
            Within 3 months of finishing the Full-Stack Bootcamp, I landed my first role as a Frontend Engineer."
          </p>
          <div className="quote-author">
            <div className="author-avatar">AL</div>
            <div className="author-details">
              <strong>Alex Liang</strong>
              <span>Frontend Engineer at CloudScale &bull; Course Center Alum</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-section">
        <div className="cta-box">
          <div className="cta-content">
            <h2>Ready to Advance Your Skills?</h2>
            <p>
              Join thousands of students building projects and learning new tech stacks today.
            </p>
            <div className="cta-actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('courses')}
              >
                Browse All Courses &rarr;
              </button>
              {!currentUser && (
                <button
                  className="btn btn-white btn-lg"
                  onClick={() => onNavigate('login')}
                >
                  Student Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
