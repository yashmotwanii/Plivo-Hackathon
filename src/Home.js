// HomePage.js

import React from 'react';
import './Home.css'; // Add your custom styles in HomePage.css

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
      </header>

      <section className="main-section">
        <div className="content">
          <h2>Your Personal Time Companion</h2>
          <div className="feature">
            <div className="gradient-background">
              <p>Never miss an important moment! PunctualPal helps you stay on top of your schedule by sending timely reminders to keep you punctual and organized.</p>
            </div>
          </div>

          <img src="https://static.javatpoint.com/essay/images/punctuality-essay.png" alt="Time Image" className="app-image" />

          <div className="feature">
            <div className="gradient-background">
              <p>Whether it's a meeting, deadline, or personal event, PunctualPal is here to make sure you're always on time. Sign in now and experience the joy of stress-free scheduling!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
