import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { User, Mail, Phone, Save, Edit3, AlertCircle, CheckCircle } from 'lucide-react';

const inputStyle = {
  width: '100%', padding: '0.65rem 0.85rem', borderRadius: 8,
  border: '1.5px solid #e2e8f0', fontSize: '0.9rem', color: '#0f172a',
  background: '#f8fafc', outline: 'none', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: 5 };

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile', { headers: { Authorization: `Bearer ${token}` } });
        const data = res.data?.data || res.data;
        setProfile(data);
        setForm({ username: data.username || '', email: data.email || '', phone: data.phone || '' });
      } catch {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    setSaving(true); setMessage('');
    try {
      const updates = {};
      if (form.email !== profile.email) updates.email = form.email;
      if (form.phone !== profile.phone) updates.phone = form.phone;
      if (Object.keys(updates).length === 0) {
        setEditing(false); setSaving(false); return;
      }
      await api.patch('/profile/edit', updates, { headers: { Authorization: `Bearer ${token}` } });
      setProfile(prev => ({ ...prev, ...updates }));
      setMessage('Profile updated successfully!');
      setIsError(false);
      setEditing(false);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to update profile.');
      setIsError(true);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sora','Segoe UI',sans-serif" }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '6rem', color: '#94a3b8' }}>Loading profile...</div>
    </div>
  );

  const initials = (profile?.username || 'U').slice(0, 2).toUpperCase();

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sora','Segoe UI',sans-serif" }}>
      <Navbar />

      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>My Profile</h1>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0' }}>Manage your account details</p>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {/* Avatar section */}
          <div style={{ background: 'linear-gradient(135deg, #eff6ff, #f0f9ff)', padding: '2rem', display: 'flex', alignItems: 'center', gap: 20, borderBottom: '1px solid #e2e8f0' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 700, color: '#fff',
              flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{profile?.username}</h2>
              <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>{profile?.email}</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <button
                onClick={() => setEditing(!editing)}
                style={{
                  background: editing ? '#fff1f2' : '#eff6ff',
                  border: editing ? '1.5px solid #fca5a5' : '1.5px solid #bfdbfe',
                  color: editing ? '#dc2626' : '#1d4ed8',
                  padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer',
                  fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                <Edit3 size={14} /> {editing ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {message && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem',
                borderRadius: 8, background: isError ? '#fee2e2' : '#d1fae5',
                color: isError ? '#dc2626' : '#059669', fontWeight: 500, fontSize: '0.875rem',
              }}>
                {isError ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                {message}
              </div>
            )}

            <div>
              <label style={labelStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><User size={13} /> Username</span>
              </label>
              <input
                value={form.username || ''}
                disabled
                style={{ ...inputStyle, background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed' }}
              />
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Username cannot be changed</p>
            </div>

            <div>
              <label style={labelStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Mail size={13} /> Email</span>
              </label>
              <input
                type="email"
                value={form.email || ''}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                disabled={!editing}
                style={{ ...inputStyle, background: editing ? '#fff' : '#f1f5f9', color: editing ? '#0f172a' : '#64748b' }}
              />
            </div>

            <div>
              <label style={labelStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Phone size={13} /> Phone</span>
              </label>
              <input
                type="tel"
                value={form.phone || ''}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="Enter phone number"
                disabled={!editing}
                style={{ ...inputStyle, background: editing ? '#fff' : '#f1f5f9', color: editing ? '#0f172a' : '#64748b' }}
              />
            </div>

            {editing && (
              <button onClick={handleSave} disabled={saving} style={{
                padding: '0.75rem', borderRadius: 10, border: 'none',
                background: saving ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: saving ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/booking')} style={{
            flex: 1, padding: '0.85rem', borderRadius: 12, border: '1.5px solid #e2e8f0',
            background: '#fff', color: '#1d4ed8', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            📋 My Bookings
          </button>
          <button onClick={() => navigate('/shownearbygarages')} style={{
            flex: 1, padding: '0.85rem', borderRadius: 12, border: '1.5px solid #e2e8f0',
            background: '#fff', color: '#1d4ed8', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            🔍 Find Garages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
