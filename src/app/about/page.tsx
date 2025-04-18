// src/app/about/page.tsx
import React from 'react';

const About = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full screen height
      color: 'white', // White text color
      textAlign: 'center', // Center text horizontally
    }}
  >
    <div>
      <h1 style={{ fontSize: '3rem' }}>About Study Buddy</h1>
      <p style={{ fontSize: '1.25rem' }}>
        Study Buddy is an app designed to help UHM ICS students organize face-to-face study groups in ICSpace.
      </p>
    </div>
  </div>
);

export default About;
