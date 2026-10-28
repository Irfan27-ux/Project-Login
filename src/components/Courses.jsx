import { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';

export default function Courses({ onNavigate, currentUser, onEnroll, enrolledCourses = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledMsg, setEnrolledMsg] = useState('');

  const categories = ['All', 'Programming', 'Data Science', 'Design'];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnrollClick = (course) => {
    if (!currentUser) {
      onNavigate('login');
      return;
    }

    if (onEnroll) {
      onEnroll(course);
      setEnrolledMsg(`🎉 You have enrolled in "${course.title}"! Added to your Student Dashboard.`);
      setTimeout(() => setEnrolledMsg(''), 4000);
    }
  };

  return (
    <div className="courses-page-container">
      {/* Top Header */}
      <div className="catalog-header">
        <span className="section-eyebrow">Explore Learning Paths</span>
        <h1 className="catalog-title">Comprehensive Course Catalog</h1>
        <p className="catalog-subtitle">
          Hands-on programs led by industry leaders. Gain practical experience and earn shareable certificates.
        </p>

        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course title, skill, or instructor..."
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              &times;
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="filter-pill-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {enrolledMsg && (
        <div className="success-banner">
          {enrolledMsg}
        </div>
      )}

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="no-courses-found">
          <span className="empty-icon">🔎</span>
          <h3>No matching courses found</h3>
          <p>Try searching for a different keyword or resetting your filter category.</p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourses.some((c) => c.id === course.id);

            return (
              <div key={course.id} className="course-card">
                <div
                  className="course-thumbnail"
                  style={{ background: `linear-gradient(135deg, ${course.color}15, ${course.color}30)` }}
                >
                  <span className="course-thumb-icon">{course.icon}</span>
                  <span
                    className="course-badge"
                    style={{ backgroundColor: `${course.color}20`, color: course.color }}
                  >
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
                    <span className="rating-pill">⭐ {course.rating} ({course.reviews})</span>
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
                      className={`btn btn-sm ${isEnrolled ? 'btn-enrolled' : 'btn-primary'}`}
                      onClick={() => handleEnrollClick(course)}
                      disabled={isEnrolled}
                    >
                      {isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
