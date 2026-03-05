import './AboutUs.css';

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Michael Chen",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1632054224659-280be3239aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBtYWxlfGVufDF8fHx8MTc3MjcyNDI1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "15+ years in hematology and blood bank management"
    },
    {
      name: "Sarah Johnson",
      role: "Director of Operations",
      image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBudXJzZSUyMGZlbWFsZXxlbnwxfHx8fDE3NzI3MjQyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Specializing in healthcare logistics and supply chain"
    },
    {
      name: "Dr. Raj Patel",
      role: "Head of Quality Assurance",
      image: "https://images.unsplash.com/photo-1632054226038-ed6997bfce1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMGRvY3RvcnxlbnwxfHx8fDE3NzI3MjQyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Expert in blood safety protocols and regulatory compliance"
    },
    {
      name: "Dr. Amara Williams",
      role: "Research & Development Lead",
      image: "https://images.unsplash.com/photo-1632054229795-4097870879b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhZnJpY2FuJTIwZG9jdG9yfGVufDF8fHx8MTc3MjcyNDI1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Pioneering innovative blood storage and testing methods"
    }
  ];

  const stats = [
    { value: "50K+", label: "Lives Saved", icon: "👥" },
    { value: "1M+", label: "Units Processed", icon: "📊" },
    { value: "24/7", label: "Availability", icon: "🕐" },
    { value: "15+", label: "Years Experience", icon: "🏆" }
  ];

  const values = [
    {
      icon: "🛡️",
      title: "Safety First",
      description: "Rigorous testing and quality control ensure the highest safety standards"
    },
    {
      icon: "❤️",
      title: "Compassionate Care",
      description: "Every donation and transfusion is handled with dignity and respect"
    },
    {
      icon: "⚡",
      title: "Swift Response",
      description: "Round-the-clock operations to meet critical blood supply demands"
    },
    {
      icon: "👥",
      title: "Community Focus",
      description: "Building strong partnerships with donors, hospitals, and healthcare providers"
    }
  ];

  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbHxlbnwxfHx8fDE3NzI2NDUzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Blood donation background"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <span className="hero-badge">About Us</span>
          <h1 className="hero-title">
            Bridging Hearts,
            <span className="hero-subtitle">Saving Lives</span>
          </h1>
          <p className="hero-description">
            Dedicated to ensuring that every drop of blood reaches those who need it most, 
            when they need it most. Together, we create a lifeline for our community.
          </p>
        </div>
        
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="vision-mission-grid">
            {/* Vision Box */}
            <div className="vision-box card">
              <div className="card-header">
                <div className="icon-circle">
                  <span className="icon">👁️</span>
                </div>
                <h2>Our Vision</h2>
              </div>
              <p className="card-text">
                To create a world where no life is lost due to blood shortage. We envision a future 
                with advanced blood bank management systems that seamlessly connect donors with recipients, 
                utilizing cutting-edge technology to maintain optimal inventory levels and ensure rapid 
                emergency response capabilities across all communities.
              </p>
            </div>

            {/* Mission Box */}
            <div className="mission-box card">
              <div className="card-header">
                <div className="icon-circle">
                  <span className="icon">🎯</span>
                </div>
                <h2>Our Mission</h2>
              </div>
              <p className="card-text">
                To provide safe, reliable, and efficient blood banking services through innovative 
                technology and compassionate care. We are committed to maintaining the highest 
                standards of quality, building strong community partnerships, and ensuring that 
                life-saving blood is available whenever and wherever it's needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon-circle">
                  <span className="stat-icon">{stat.icon}</span>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card card">
                <div className="value-icon-circle">
                  <span className="value-icon">{value.icon}</span>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Team</span>
            <h2>Meet Our Team</h2>
            <p>Dedicated professionals committed to excellence in blood bank management</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card card">
                <div className="team-image-wrapper">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                  />
                  <div className="team-overlay"></div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="collaboration-section">
        <div className="container-small">
          <div className="collaboration-card card">
            <div className="collaboration-content">
              <h2>Working Together</h2>
              <p>
                Our multidisciplinary team collaborates seamlessly to ensure that every aspect of 
                blood bank management meets the highest standards of excellence.
              </p>
              <p>
                From collection to distribution, we work hand-in-hand to save lives every single day.
              </p>
              <div className="collaboration-badges">
                <span className="collab-badge">Excellence</span>
                <span className="collab-badge">Innovation</span>
                <span className="collab-badge">Teamwork</span>
              </div>
            </div>
            <div className="collaboration-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1770221797869-81e508282ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcyNjczNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Medical team collaboration"
                className="collaboration-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-heart">❤️</div>
            <h2>Join Us in Saving Lives</h2>
            <p>
              Whether you're a donor, healthcare provider, or community partner, 
              there's a place for you in our mission to ensure no life is lost due to blood shortage.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Become a Donor</button>
              <button className="cta-btn secondary">Partner With Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Blood Bank Management System. All rights reserved. | Saving lives, one donation at a time.</p>
        </div>
      </footer>
    </div>
  );
}
