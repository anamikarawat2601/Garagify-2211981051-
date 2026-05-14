import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Calendar, Clock, Car, Wrench, CheckCircle, XCircle, Loader, AlertCircle } from 'lucide-react';

const statusConfig = {
  pending: { color: '#f59e0b', bg: '#fef3c7', icon: <Loader size={13} />, label: 'Pending' },
  accepted: { color: '#059669', bg: '#d1fae5', icon: <CheckCircle size={13} />, label: 'Accepted' },
  rejected: { color: '#dc2626', bg: '#fee2e2', icon: <XCircle size={13} />, label: 'Rejected' },
  completed: { color: '#2563eb', bg: '#dbeafe', icon: <CheckCircle size={13} />, label: 'Completed' },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status?.toLowerCase()] || statusConfig.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg.bg, color: cfg.color,
      padding: '0.3rem 0.65rem', borderRadius: 20,
      fontSize: '0.78rem', fontWeight: 600,
    }}>
      {cfg.icon} {cfg.label}
    </span>
  );
};

const Booking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    // decode user_id from JWT
    let userId;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id || payload.user_id;
    } catch {
      navigate('/login'); return;
    }

    const fetchBookings = async () => {
      try {
        const res = await api.get(`/booking/track/history/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (err?.response?.status === 404) {
          setBookings([]);
        } else {
          setError('Failed to load bookings. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sora','Segoe UI',sans-serif" }}>
      <Navbar />

      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>My Bookings</h1>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0', fontSize: '1rem' }}>Track all your garage appointments</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading your bookings...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>
            <AlertCircle size={40} style={{ marginBottom: 12 }} />
            <p>{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <Calendar size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
            <h3 style={{ color: '#1e293b', marginBottom: 8 }}>No bookings yet</h3>
            <p style={{ marginBottom: 20 }}>Book a garage service to get started</p>
            <button
              onClick={() => navigate('/shownearbygarages')}
              style={{
                background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)', color: '#fff',
                border: 'none', padding: '0.75rem 1.5rem', borderRadius: 10,
                fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
              }}>
              Find Nearby Garages
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bookings.map(b => (
              <div key={b.booking_id} style={{
                background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '1.25rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      background: '#eff6ff', borderRadius: 8, padding: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Wrench size={16} color="#1d4ed8" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{b.service_type}</p>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>Booking #{b.booking_id}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: '0.82rem' }}>
                      <Car size={13} /> {b.vehicle_type}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: '0.82rem' }}>
                      <Calendar size={13} /> {formatDate(b.booking_date)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: '0.82rem' }}>
                      <Clock size={13} /> {b.booking_time || 'N/A'}
                    </span>
                  </div>
                </div>
                <StatusBadge status={b.status || 'pending'} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
