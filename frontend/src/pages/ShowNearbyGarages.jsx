import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { MapPin, Phone, Clock, Star, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const STATIC_STORES = [
  { store_id: 1, name: 'AutoFix Garage', rating: 4.5, latitude: 40.712776, longitude: -74.005974, address: '123 Main St, New York, NY', phone_number: '+1-555-123-4567', open_hours: '8am - 6pm', services: 'Oil change, brakes, diagnostics' },
  { store_id: 2, name: 'Speedy Repairs', rating: 4.2, latitude: 40.730610, longitude: -73.935242, address: '22 Queens Blvd, Queens, NY', phone_number: '+1-555-234-5678', open_hours: '9am - 7pm', services: 'Tires, brakes, general service' },
  { store_id: 3, name: 'GaragePro Mechanics', rating: 4.8, latitude: 40.758896, longitude: -73.985130, address: '45 Midtown Ave, Manhattan, NY', phone_number: '+1-555-345-6789', open_hours: '7am - 5pm', services: 'Engine diagnostics, AC, transmission' },
  { store_id: 4, name: 'FixIt Auto Care', rating: 3.9, latitude: 40.706192, longitude: -74.009160, address: '78 Broad St, New York, NY', phone_number: '+1-555-456-7890', open_hours: '8am - 8pm', services: 'Quick lube, tires, battery' },
  { store_id: 5, name: 'WheelWorks Garage', rating: 4.7, latitude: 40.742054, longitude: -74.001524, address: '90 10th Ave, New York, NY', phone_number: '+1-555-567-8901', open_hours: '9am - 6pm', services: 'Alignment, suspension, tires' },
  { store_id: 6, name: 'Manhattan Auto Clinic', rating: 4.6, latitude: 40.751620, longitude: -73.977230, address: '200 Park Ave, New York, NY', phone_number: '+1-555-678-9012', open_hours: '8am - 6pm', services: 'Oil change, engine diagnostics, brakes' },
  { store_id: 7, name: 'Queens QuickFix', rating: 4.1, latitude: 40.744000, longitude: -73.948900, address: '88 Northern Blvd, Queens, NY', phone_number: '+1-555-789-0123', open_hours: '9am - 7pm', services: 'Tires, brakes, general service' },
  { store_id: 8, name: 'Bronx Auto Care', rating: 4.3, latitude: 40.844782, longitude: -73.864827, address: '450 Fordham Rd, Bronx, NY', phone_number: '+1-555-890-1234', open_hours: '8am - 8pm', services: 'Tune-ups, tire rotation, repairs' },
  { store_id: 9, name: 'Brooklyn Motors', rating: 4.7, latitude: 40.678178, longitude: -73.944158, address: '310 Flatbush Ave, Brooklyn, NY', phone_number: '+1-555-901-2345', open_hours: '9am - 6pm', services: 'General repairs, painting, diagnostics' },
  { store_id: 10, name: 'SoHo Auto Works', rating: 4.9, latitude: 40.724330, longitude: -74.001850, address: '400 Broome St, SoHo, NY', phone_number: '+1-555-456-7892', open_hours: '8am - 6pm', services: 'Luxury car service, detailing, brakes' },
  { store_id: 11, name: 'Chelsea Garage', rating: 4.5, latitude: 40.746500, longitude: -74.001374, address: '230 W 20th St, New York, NY', phone_number: '+1-555-567-8903', open_hours: '9am - 7pm', services: 'Oil change, suspension, air conditioning' },
  { store_id: 12, name: 'Tribeca Auto Spa', rating: 4.9, latitude: 40.719526, longitude: -74.008993, address: '55 Hudson St, Tribeca, NY', phone_number: '+1-555-678-9015', open_hours: '8am - 6pm', services: 'Luxury service, detailing, performance tuning' },
];

const StarRating = ({ rating }) => {
  const val = parseFloat(rating) || 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Star size={14} fill="#f59e0b" color="#f59e0b" />
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f59e0b' }}>{val.toFixed(1)}</span>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: 5 };
const inputStyle = {
  width: '100%', padding: '0.6rem 0.75rem', borderRadius: 8,
  border: '1.5px solid #e2e8f0', fontSize: '0.875rem', color: '#0f172a',
  background: '#f8fafc', outline: 'none', boxSizing: 'border-box',
};

const ShowNearbyGarages = () => {
  const [stores, setStores] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [vehicleType, setVehicleType] = useState('Car');
  const [serviceType, setServiceType] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get('/nearbygarage/all');
        const data = Array.isArray(res.data) ? res.data : [];
        const list = data.length > 0 ? data : STATIC_STORES;
        setStores(list);
        setFiltered(list);
      } catch {
        setStores(STATIC_STORES);
        setFiltered(STATIC_STORES);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) { setFiltered(stores); return; }
    setFiltered(stores.filter(s =>
      s.name?.toLowerCase().includes(q) ||
      s.address?.toLowerCase().includes(q) ||
      s.services?.toLowerCase().includes(q)
    ));
  }, [search, stores]);

  const openBooking = (store) => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    setSelectedStore(store);
    setVehicleType('Car'); setServiceType(''); setBookingDate(''); setBookingTime('');
    setBookingMessage(''); setBookingSuccess(false);
    setShowBooking(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleType || !serviceType || !bookingDate || !bookingTime) {
      setBookingMessage('Please fill all fields.'); setBookingSuccess(false); return;
    }
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    setSubmitting(true);
    try {
      const res = await api.post('/booking', {
        store_id: selectedStore.store_id,
        vehicle_type: vehicleType,
        service_type: serviceType,
        booking_date: bookingDate,
        booking_time: bookingTime,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setBookingMessage(res.data?.message || 'Booking confirmed!');
      setBookingSuccess(true);
      setTimeout(() => { setShowBooking(false); }, 1500);
    } catch (err) {
      setBookingMessage(err?.response?.data?.error || 'Failed to create booking.');
      setBookingSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sora','Segoe UI',sans-serif" }}>
      <Navbar />

      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Nearby Garages</h1>
          <p style={{ color: '#94a3b8', margin: '0.5rem 0 1.5rem', fontSize: '1rem' }}>Find and book trusted garages in your area</p>
          <div style={{ position: 'relative', maxWidth: 480 }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, address, or service..."
              style={{
                width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                borderRadius: 10, border: '1.5px solid #1e40af',
                background: 'rgba(255,255,255,0.08)', color: '#fff',
                fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '0 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8', fontSize: '1rem' }}>Loading garages...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>No garages found for "{search}"</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: 20 }}>
            {filtered.map(store => (
              <div key={store.store_id} style={{
                background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: '1.25rem',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{store.name}</h3>
                  <StarRating rating={store.rating} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: '#64748b', fontSize: '0.82rem' }}>
                  <MapPin size={13} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{store.address || 'N/A'}</span>
                </div>
                {store.services && (
                  <div style={{ fontSize: '0.8rem', color: '#0369a1', background: '#f0f9ff', borderRadius: 6, padding: '0.4rem 0.6rem', border: '1px solid #bae6fd' }}>
                    {store.services}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Phone size={12} />{store.phone_number || 'N/A'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} />{store.open_hours || 'N/A'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <button onClick={() => openBooking(store)} style={{
                    flex: 1, padding: '0.55rem', borderRadius: 8, border: 'none',
                    background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                    color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                  }}>
                    Book Now
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`}
                    target="_blank" rel="noreferrer"
                    style={{
                      flex: 1, padding: '0.55rem', borderRadius: 8,
                      border: '1.5px solid #1d4ed8', color: '#1d4ed8',
                      fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
                      textAlign: 'center', display: 'block',
                    }}>
                    View Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBooking && selectedStore && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem',
        }} onClick={() => !submitting && setShowBooking(false)}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: '2rem',
            width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Book Appointment</h2>
                <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>{selectedStore.name}</p>
              </div>
              <button onClick={() => setShowBooking(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Vehicle Type</label>
                <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} style={inputStyle} required>
                  <option>Car</option><option>Bike</option><option>Truck</option><option>SUV</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Service Type</label>
                <input value={serviceType} onChange={e => setServiceType(e.target.value)}
                  placeholder="e.g., Oil change, Tyre repair..." style={inputStyle} required />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Time</label>
                  <input type="time" value={bookingTime} onChange={e => setBookingTime(e.target.value)} style={inputStyle} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="submit" disabled={submitting} style={{
                  flex: 1, padding: '0.7rem', borderRadius: 8, border: 'none',
                  background: submitting ? '#93c5fd' : 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: submitting ? 'not-allowed' : 'pointer',
                }}>
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
                <button type="button" onClick={() => setShowBooking(false)} disabled={submitting} style={{
                  padding: '0.7rem 1.25rem', borderRadius: 8, border: '1.5px solid #e2e8f0',
                  background: '#fff', color: '#64748b', fontWeight: 600, cursor: 'pointer',
                }}>
                  Cancel
                </button>
              </div>
            </form>
            {bookingMessage && (
              <p style={{ marginTop: 12, color: bookingSuccess ? '#059669' : '#dc2626', fontWeight: 500, fontSize: '0.875rem' }}>
                {bookingMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowNearbyGarages;
