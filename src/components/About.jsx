export default function About() {
  const mentors = [
    {
      name: 'David Miller',
      role: 'Lead Full-Stack Architect',
      experience: 'Ex-Google & Stripe • 10+ yrs',
      avatar: '👨‍💻',
      specialty: 'React, Node.js, Distributed Systems',
    },
    {
      name: 'Dr. Sarah Chen',
      role: 'Head of Data Science & AI',
      experience: 'PhD Stanford • 8+ yrs',
      avatar: '👩‍🔬',
      specialty: 'Machine Learning, Deep Learning, Python',
    },
    {
      name: 'Emma Watson',
      role: 'Principal Product Designer',
      experience: 'Design Lead • 7+ yrs',
      avatar: '🧑‍🎨',
      specialty: 'Figma, Design Systems, UX Research',
    },
  ];

  return (
    <div className="about-page-container">
      {/* Header */}
      <div className="about-hero-header">
        <span className="section-eyebrow">Our Mission & Values</span>
        <h1>Empowering Careers Through High-Impact Tech Education</h1>
        <p>
          Course Center was founded to provide learners worldwide with direct, practical skills taught by seasoned practitioners.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="about-two-col-grid">
        <div className="about-story-card">
          <h3>The Practical Learning Promise</h3>
          <p>
            Traditional courses often bury students in theoretical slides without hands-on practice.
            At Course Center, we do things differently: every concept is immediately reinforced by writing real code,
            debugging actual production issues, and building scalable software.
          </p>
          <p>
            Whether you are beginning your journey or seeking to advance your current tech career,
            our curriculum evolves constantly with industry demands.
          </p>
        </div>

        <div className="about-stats-panel">
          <div className="about-stat-box">
            <span className="about-stat-num">12,500+</span>
            <span className="about-stat-title">Alumni Worldwide</span>
          </div>
          <div className="about-stat-box">
            <span className="about-stat-num">50+</span>
            <span className="about-stat-title">Active Curricula</span>
          </div>
          <div className="about-stat-box">
            <span className="about-stat-num">95%</span>
            <span className="about-stat-title">Career Success Rate</span>
          </div>
          <div className="about-stat-box">
            <span className="about-stat-num">4.9 / 5</span>
            <span className="about-stat-title">Course Review Score</span>
          </div>
        </div>
      </div>

      {/* Mentors Section */}
      <div className="mentors-section">
        <div className="section-header-center">
          <span className="section-eyebrow">Expert Faculty</span>
          <h2>Learn Directly From Industry Practitioners</h2>
          <p>Our mentors are active leads at top-tier software companies.</p>
        </div>

        <div className="mentors-grid">
          {mentors.map((m, idx) => (
            <div key={idx} className="mentor-card">
              <span className="mentor-avatar-badge">{m.avatar}</span>
              <h3>{m.name}</h3>
              <span className="mentor-role-tag">{m.role}</span>
              <p className="mentor-experience" dangerouslySetInnerHTML={{ __html: m.experience }}></p>
              <div className="mentor-specialty">
                <strong>Focus:</strong> {m.specialty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="about-contact-card">
        <div className="contact-left">
          <h3>Student Support & Campus Inquiries</h3>
          <p>Have questions about prerequisites, schedules, or company sponsorships? We are here to help.</p>
        </div>
        <div className="contact-right">
          <div className="contact-item">
            <span>📧 Admissions:</span>
            <strong>admissions@coursecenter.edu</strong>
          </div>
          <div className="contact-item">
            <span>📞 Direct Phone:</span>
            <strong>+1 (800) 555-0199</strong>
          </div>
          <div className="contact-item">
            <span>📍 Campus Address:</span>
            <strong>100 Innovation Way, Suite 400, San Francisco, CA</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
