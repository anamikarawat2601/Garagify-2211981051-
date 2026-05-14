import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Wrench } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Nearby Garages', path: '/shownearbygarages' },
    { label: 'Booking', path: '/booking' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => navigate('/')}>
          <div style={styles.logoIcon}><Wrench size={18} color="#fff" /></div>
          <span style={styles.logoText}>Garagify</span>
        </div>

        {/* Desktop Links */}
        <div style={styles.links}>
          {navLinks.map(link => (
            <button
              key={link.path}
              style={{ ...styles.link, ...(isActive(link.path) ? styles.linkActive : {}) }}
              onClick={() => navigate(link.path)}
            >
              {link.label}
              {isActive(link.path) && <div style={styles.linkUnderline} />}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div style={styles.auth}>
          {token ? (
            <>
              <button style={styles.profileBtn} onClick={() => navigate('/profile')}>Profile</button>
              <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button style={styles.loginBtn} onClick={() => navigate('/login')}>Login</button>
              <button style={styles.signupBtn} onClick={() => navigate('/sign')}>Sign Up</button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <button key={link.path} style={styles.mobileLink}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}>
              {link.label}
            </button>
          ))}
          <div style={styles.mobileDivider} />
          {token ? (
            <>
              <button style={styles.mobileLink} onClick={() => { navigate('/profile'); setMenuOpen(false); }}>Profile</button>
              <button style={{ ...styles.mobileLink, color: '#ef4444' }} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button style={styles.mobileLink} onClick={() => { navigate('/login'); setMenuOpen(false); }}>Login</button>
              <button style={{ ...styles.mobileLink, color: '#2563eb' }} onClick={() => { navigate('/sign'); setMenuOpen(false); }}>Sign Up</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 1000,
    backgroundColor: '#fff',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 1px 12px rgba(0,0,0,0.07)',
    fontFamily: "'Sora', 'Segoe UI', sans-serif",
  },
  inner: {
    maxWidth: 1200, margin: '0 auto',
    padding: '0 1.5rem', height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
  },
  logoIcon: {
    background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
    borderRadius: 8, width: 34, height: 34,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    fontSize: '1.25rem', fontWeight: 700,
    background: 'linear-gradient(90deg, #1d4ed8, #0ea5e9)',
    WebkitBackgroundClip: 'text', color: 'transparent',
  },
  links: { display: 'flex', alignItems: 'center', gap: '0.25rem' },
  link: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    fontSize: '0.9rem', fontWeight: 500, color: '#475569',
    padding: '0.5rem 0.85rem', borderRadius: 8,
    position: 'relative', transition: 'color 0.2s, background 0.2s',
  },
  linkActive: { color: '#1d4ed8', background: '#eff6ff' },
  linkUnderline: {
    position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
    width: 18, height: 2, borderRadius: 2,
    background: 'linear-gradient(90deg, #1d4ed8, #0ea5e9)',
  },
  auth: { display: 'flex', alignItems: 'center', gap: 10 },
  loginBtn: {
    background: 'transparent', border: '1.5px solid #1d4ed8', color: '#1d4ed8',
    padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer',
    fontWeight: 600, fontSize: '0.875rem',
  },
  signupBtn: {
    background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)', color: 'white',
    border: 'none', padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer',
    fontWeight: 600, fontSize: '0.875rem',
  },
  profileBtn: {
    background: '#f0f9ff', border: '1.5px solid #0ea5e9', color: '#0369a1',
    padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer',
    fontWeight: 600, fontSize: '0.875rem',
  },
  logoutBtn: {
    background: '#fff1f2', border: '1.5px solid #fca5a5', color: '#dc2626',
    padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer',
    fontWeight: 600, fontSize: '0.875rem',
  },
  hamburger: {
    display: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
    color: '#1e293b',
    '@media(maxWidth:768px)': { display: 'flex' },
  },
  mobileMenu: {
    background: '#fff', borderTop: '1px solid #e2e8f0',
    padding: '0.75rem 1.5rem 1rem',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  mobileLink: {
    background: 'transparent', border: 'none', cursor: 'pointer',
    textAlign: 'left', padding: '0.65rem 0.5rem',
    fontSize: '0.95rem', fontWeight: 500, color: '#1e293b',
    borderRadius: 6,
  },
  mobileDivider: { height: 1, background: '#e2e8f0', margin: '0.5rem 0' },
};

export default Navbar;
