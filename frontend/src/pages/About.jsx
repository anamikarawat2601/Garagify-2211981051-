import Navbar from "../components/Navbar";
import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>About Garagify</h1>
          <p style={styles.subtitle}>Fast, reliable car services and on-demand fuel & battery help — wherever you are.</p>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>What is Garagify?</h2>
          <p style={styles.paragraph}>
            Garagify connects drivers with trusted garages, mobile mechanics, and fuel delivery teams in seconds.
            Request assistance, schedule services, and track arrival — all from a simple, secure app.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Key Features</h2>
          <ul style={styles.list}>
            <li>Nearby garage discovery with ratings and distance</li>
            <li>On-demand fuel delivery to your location</li>
            <li>Battery services: testing, jump-starts, and replacement</li>
            <li>Secure authentication and saved user profiles</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <ol style={styles.list}>
            <li>Sign up or log in to your Garagify account.</li>
            <li>Choose a service: find a garage, order fuel, or request battery help.</li>
            <li>Confirm your location and place the request — professionals come to you.</li>
          </ol>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact & Team</h2>
          <p style={styles.paragraph}>Have questions or want to partner with us? Reach out at <a href="mailto:support@garagify.example" style={styles.link}>support@garagify.example</a>.</p>
          <p style={styles.paragraph}>Follow our project on GitHub: <a href="https://github.com/anamikarawat2601/final" target="_blank" rel="noreferrer" style={styles.link}>Garagify Repo</a></p>
        </section>

        <div style={styles.actions}>
          <button style={styles.button} onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 16px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#e6eef8'
  },
  card: {
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#0b1220',
    border: '1px solid #172033',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 20px 40px rgba(2,6,23,0.6)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '28px',
    margin: 0,
    background: 'linear-gradient(90deg,#60a5fa,#7c3aed)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontWeight: 700
  },
  subtitle: {
    color: '#9aa8bf',
    marginTop: '8px'
  },
  section: {
    marginTop: '20px'
  },
  sectionTitle: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#dbeafe'
  },
  paragraph: {
    color: '#9aa8bf',
    lineHeight: 1.6
  },
  list: {
    color: '#9aa8bf',
    paddingLeft: '1.15rem'
  },
  link: {
    color: '#7c3aed',
    textDecoration: 'underline'
  },
  actions: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default About;
