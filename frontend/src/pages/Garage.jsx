import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { CheckCircle, XCircle, Clock, Wrench, Car, Calendar, AlertCircle, Store } from 'lucide-react';

const statusConfig = {
  pending: { color: '#f59e0b', bg: '#fef3c7', label: 'Pending' },
  accepted: { color: '#059669', bg: '#d1fae5', label: 'Accepted' },
  rejected: { color: '#dc2626', bg: '#fee2e2', label: 'Rejected' },
};

const Garage = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // booking_id being updated
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('garage_token');
    if (!token) { navigate('/addstore'); return; }

    const fetchGarageData = async () => {
      try {
        // Try to get store details
        const storeRes = await api.get('/garage/getdetails', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const storeData = storeRes.data?.data || storeRes.data;
        setStore(storeData);

        // Fetch pending bookings
        const bookRes = await api.get(`/garage/pendingdetails/${storeData.store_id}`);
        setBookings(Array.isArray(bookRes.data) ? bookRes.data : []);
      } catch (err) {
        if (err?.response?.status === 404) {
          setError('No store found for your account. Register your store first.');
        } else {
          setError('Failed to load garage data. Make sure you are logged in as a garage owner.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGarageData();
  }, [navigate]);

  const handleUpdate = async (bookingId, status) => {
    setUpdating(bookingId);
    try {
      await api.put(`/garage/update/${bookingId}`, { status });
      setBookings(prev => prev.filter(b => b.booking_id !== bookingId));
    } catch {
      alert('Failed to update booking status.');
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (d) => {
    if (!d) return 'N/A';
    try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sora','Segoe UI',sans-serif" }}>
      <Navbar />

      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Garage Dashboard</h1>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 0' }}>Manage incoming service requests</p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1.5rem 3rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>Loading dashboard...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>
            <AlertCircle size={48} style={{ marginBottom: 12 }} />
            <p style={{ marginBottom: 20 }}>{error}</p>
            <button onClick={() => navigate('/addstore')} style={{
              background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)', color: '#fff',
              border: 'none', padding: '0.75rem 1.5rem', borderRadius: 10, fontWeight: 600, cursor: 'pointer',
            }}>
              Register Store
            </button>
          </div>
        ) : (
          <>
            {/* Store Info Card */}
            {store && (
              <div style={{
                background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: '1.5rem', marginBottom: 24,
                display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg,#1d4ed8,#0ea5e9)',
                  borderRadius: 12, width: 54, height: 54,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Store size={24} color="#fff" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>{store.name}</h2>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.85rem' }}>{store.address || 'No address set'}</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{store.rating || 'N/A'}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Rating</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1d4ed8' }}>{bookings.length}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Pending</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings List */}
            <h3 style={{ margin: '0 0 14px', fontSize: '1rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={16} color="#f59e0b" /> Pending Requests
            </h3>
            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <CheckCircle size={48} color="#10b981" style={{ marginBottom: 12 }} />
                <h3 style={{ color: '#0f172a', marginBottom: 6 }}>All clear!</h3>
                <p style={{ color: '#64748b' }}>No pending booking requests at the moment</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {bookings.map(b => (
                  <div key={b.booking_id} style={{
                    background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '1.25rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ background: '#fef3c7', borderRadius: 8, padding: 6, display: 'flex' }}>
                            <Wrench size={16} color="#f59e0b" />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>{b.service_type}</p>
                            <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>Booking #{b.booking_id} · User #{b.user_id}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.82rem' }}>
                            <Car size={13} /> {b.vehicle_type}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.82rem' }}>
                            <Calendar size={13} /> {formatDate(b.booking_date)}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#64748b', fontSize: '0.82rem' }}>
                            <Clock size={13} /> {b.booking_time || 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          disabled={updating === b.booking_id}
                          onClick={() => handleUpdate(b.booking_id, 'accepted')}
                          style={{
                            padding: '0.5rem 1rem', borderRadius: 8, border: 'none',
                            background: updating === b.booking_id ? '#d1fae5' : '#10b981',
                            color: '#fff', fontWeight: 600, fontSize: '0.85rem',
                            cursor: updating === b.booking_id ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: 5,
                          }}>
                          <CheckCircle size={14} /> Accept
                        </button>
                        <button
                          disabled={updating === b.booking_id}
                          onClick={() => handleUpdate(b.booking_id, 'rejected')}
                          style={{
                            padding: '0.5rem 1rem', borderRadius: 8, border: '1.5px solid #fca5a5',
                            background: '#fff1f2', color: '#dc2626', fontWeight: 600, fontSize: '0.85rem',
                            cursor: updating === b.booking_id ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: 5,
                          }}>
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Garage;
