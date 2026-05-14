import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Store, MapPin, Star, CheckCircle, AlertCircle } from 'lucide-react';

const inputStyle = {
  width: '100%', padding: '0.65rem 0.85rem', borderRadius: 8,
  border: '1.5px solid #e2e8f0', fontSize: '0.9rem', color: '#0f172a',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: 6 };

const AddStore = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', rating: '', latitude: '', longitude: '', address: '', phone_number: '', open_hours: '', services: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const getLocation = () => {
    if (!navigator.geolocation) { alert('Geolocation not supported'); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setForm(f => ({
          ...f,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
      },
      () => alert('Could not fetch location. Please enter manually.')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.latitude || !form.longitude) {
      setMessage('Please fill all required fields.'); setIsError(true); return;
    }
    setSubmitting(true); setMessage('');
    try {
      const res = await api.post('/addstore', {
        name: form.name,
        rating: parseFloat(form.rating),
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        address: form.address,
        phone_number: form.phone_number,
        open_hours: form.open_hours,
        services: form.services,
      });
      setMessage(res.data?.message || 'Store registered successfully!');
      setIsError(false);
      setSuccess(true);
      // Store the garage token if returned
      if (res.data?.token) localStorage.setItem('garage_token', res.data.token);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to register store.');
      setIsError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sora','Segoe UI',sans-serif" }}>
      <Navbar />

      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Register Your Garage</h1>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0' }}>Join Garagify and start accepting bookings from customers</p>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1.5rem 3rem' }}>
        {success ? (
          <div style={{
            background: '#fff', borderRadius: 16, border: '1px solid #a7f3d0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)', padding: '3rem',
            textAlign: 'center',
          }}>
            <CheckCircle size={56} color="#059669" style={{ marginBottom: 16 }} />
            <h2 style={{ color: '#0f172a', marginBottom: 8 }}>Store Registered!</h2>
            <p style={{ color: '#64748b', marginBottom: 24 }}>{message}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => navigate('/garage')} style={{
                padding: '0.75rem 1.5rem', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)', color: '#fff',
                fontWeight: 700, cursor: 'pointer',
              }}>
                Manage Garage
              </button>
              <button onClick={() => navigate('/')} style={{
                padding: '0.75rem 1.5rem', borderRadius: 10, border: '1.5px solid #e2e8f0',
                background: '#fff', color: '#1d4ed8', fontWeight: 700, cursor: 'pointer',
              }}>
                Go Home
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', padding: '2rem' }}>
            {message && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem',
                borderRadius: 8, background: isError ? '#fee2e2' : '#d1fae5',
                color: isError ? '#dc2626' : '#059669', fontWeight: 500, fontSize: '0.875rem', marginBottom: 20,
              }}>
                {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Basic Info */}
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 16 }}>
                <h3 style={{ margin: '0 0 14px', fontSize: '0.9rem', fontWeight: 700, color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Store size={15} /> Basic Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={labelStyle}>Store Name *</label>
                    <input value={form.name} onChange={e => handleChange('name', e.target.value)}
                      placeholder="e.g., AutoFix Garage" style={inputStyle} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Rating (1–5) *</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Star size={14} color="#f59e0b" fill="#f59e0b" />
                      <input type="number" min="1" max="5" step="0.1" value={form.rating}
                        onChange={e => handleChange('rating', e.target.value)}
                        placeholder="4.5" style={inputStyle} required />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input type="tel" value={form.phone_number} onChange={e => handleChange('phone_number', e.target.value)}
                      placeholder="+1-555-000-0000" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Open Hours</label>
                    <input value={form.open_hours} onChange={e => handleChange('open_hours', e.target.value)}
                      placeholder="8am - 6pm" style={inputStyle} />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={labelStyle}>Address</label>
                    <input value={form.address} onChange={e => handleChange('address', e.target.value)}
                      placeholder="123 Main St, City, State" style={inputStyle} />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={labelStyle}>Services Offered</label>
                    <input value={form.services} onChange={e => handleChange('services', e.target.value)}
                      placeholder="e.g., Oil change, brakes, tires, diagnostics" style={inputStyle} />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={15} /> Location *
                  </h3>
                  <button type="button" onClick={getLocation} style={{
                    background: '#eff6ff', border: '1.5px solid #bfdbfe', color: '#1d4ed8',
                    padding: '0.4rem 0.85rem', borderRadius: 8, cursor: 'pointer',
                    fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    <MapPin size={12} /> Use My Location
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Latitude *</label>
                    <input type="number" step="any" value={form.latitude} onChange={e => handleChange('latitude', e.target.value)}
                      placeholder="e.g., 40.712776" style={inputStyle} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Longitude *</label>
                    <input type="number" step="any" value={form.longitude} onChange={e => handleChange('longitude', e.target.value)}
                      placeholder="e.g., -74.005974" style={inputStyle} required />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={submitting} style={{
                padding: '0.8rem', borderRadius: 10, border: 'none',
                background: submitting ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer',
                marginTop: 4,
              }}>
                {submitting ? 'Registering...' : 'Register Store'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStore;
