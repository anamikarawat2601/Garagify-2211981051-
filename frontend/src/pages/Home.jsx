import React, { useState } from 'react';
import { MapPin, Droplet, Battery, X, Store } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const Home = () => {
  const [showFuelForm, setShowFuelForm] = useState(false);
  const [showBatteryForm, setShowBatteryForm] = useState(false);
  const [fuelType, setFuelType] = useState("Regular Unleaded");
  const [fuelQuantity, setFuelQuantity] = useState("");
  const [fuelAddress, setFuelAddress] = useState("");
  const [batteryService, setBatteryService] = useState("Battery Replacement");
  const [vehicleModel, setVehicleModel] = useState("");
  const [batteryLocation, setBatteryLocation] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: "'Sora','Segoe UI',sans-serif" }}>
      <Navbar />
      
      {/* OLD NAV REMOVED */}
      {false && <nav style={{ display: 'none' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #4f46e5, #3b82f6)', WebkitBackgroundClip: 'text', color: 'transparent', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Garagify
          </div>

          {/* Desktop Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#4b5563',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.target.style.color = '#4b5563'}
              onClick={() => navigate('/shownearbygarages')}
            >
              Nearby Garages
            </button>

            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#4b5563',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#4f46e5'}
              onMouseLeave={(e) => e.target.style.color = '#4b5563'}
              onClick={() => navigate('/about')}
            >
              About
            </button>

            {isLoggedIn ? (
              <button
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('username'); navigate('/'); }}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    color: '#4f46e5',
                    padding: '0.5rem 1rem',
                    border: '2px solid #4f46e5',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#4f46e5'; e.target.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#4f46e5'; }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>

                <button
                  style={{
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4338ca'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#4f46e5'}
                  onClick={() => navigate('/sign')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={{ display: 'none', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <button 
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '0.5rem' }}
              onClick={() => { navigate('/shownearbygarages'); setShowMobileMenu(false); }}
            >
              Nearby Garages
            </button>
            <button 
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '0.5rem' }}
              onClick={() => { navigate('/about'); setShowMobileMenu(false); }}
            >
              About
            </button>
            {isLoggedIn ? (
              <button 
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}
                onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("username"); navigate('/'); setShowMobileMenu(false); }}
              >
                Logout
              </button>
            ) : (
              <>
                <button 
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem', backgroundColor: 'transparent', border: '2px solid #4f46e5', color: '#4f46e5', cursor: 'pointer', marginBottom: '0.5rem', borderRadius: '0.375rem' }}
                  onClick={() => { navigate('/login'); setShowMobileMenu(false); }}
                >
                  Login
                </button>
                <button 
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '0.375rem' }}
                  onClick={() => { navigate('/sign'); setShowMobileMenu(false); }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </nav>}
      
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }}></div>
          <video 
            autoPlay 
            loop 
            muted 
            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/api/placeholder/400/320" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '1.5rem', color: 'white' }}>
            <span style={{ background: 'linear-gradient(to right, #818cf8, #3b82f6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Your Car's Best Friend,
            </span> 
            <br />One Click Away
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: '#e5e7eb' }}>
            Connect with nearby garages, order fuel, and get battery services - all from one place.
          </p>

          <button 
            style={{
              backgroundColor: 'white',
              color: '#4f46e5',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onClick={() => navigate("/shownearbygarages")}
          >
            <MapPin size={20} style={{ marginRight: '0.5rem' }} />
            Find Nearby Garages
          </button>

        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#f3f4f6' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827' }}>
              <span style={{ background: 'linear-gradient(to right, #4f46e5, #3b82f6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Our Services</span>
            </h2>
            <p style={{ color: '#4b5563', marginTop: '0.75rem', fontSize: '1rem', maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
              We provide top-quality automobile services at your location, ensuring convenience and reliability.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem' }}>
            
            {/* Fuel Delivery */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'linear-gradient(to bottom right, #6366f1, #3b82f6)', padding: '1rem', borderRadius: '1rem', width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Droplet size={32} color="white" />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Fuel Delivery</h3>
                </div>
                <button 
                  style={{ backgroundColor: '#4f46e5', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }}
                  onClick={() => setShowFuelForm(!showFuelForm)}
                >
                  Book
                </button>
              </div>
              <p style={{ marginTop: '1rem', color: '#4b5563' }}>
                Ran out of fuel? No worries! We deliver high-quality fuel directly to your location.
              </p>

              {showFuelForm && (
                <div style={{ marginTop: '1.5rem', backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: '600' }}>Book Fuel Delivery</h4>
                    <X size={20} style={{ cursor: 'pointer' }} onClick={() => setShowFuelForm(false)} />
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label>Fuel Type</label>
                    <select 
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', marginTop: '0.25rem' }}
                    >
                      <option>Regular Unleaded</option>
                      <option>Premium Unleaded</option>
                      <option>Diesel</option>
                    </select>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label>Quantity (Liters)</label>
                    <input 
                      type="number" 
                      placeholder="Enter quantity" 
                      value={fuelQuantity}
                      onChange={(e) => setFuelQuantity(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', marginTop: '0.25rem' }} 
                    />
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label>Delivery Address</label>
                    <input 
                      type="text" 
                      placeholder="Enter your address" 
                      value={fuelAddress}
                      onChange={(e) => setFuelAddress(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', marginTop: '0.25rem' }} 
                    />
                  </div>
                  <button style={{ marginTop: '1rem', width: '100%', backgroundColor: '#4f46e5', color: 'white', padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>Order Now</button>
                </div>
              )}
            </div>

            {/* Battery Services */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'linear-gradient(to bottom right, #6366f1, #3b82f6)', padding: '1rem', borderRadius: '1rem', width: '4rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Battery size={32} color="white" />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>Battery Services</h3>
                </div>
                <button style={{ backgroundColor: '#4f46e5', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', cursor: 'pointer' }} onClick={() => setShowBatteryForm(!showBatteryForm)}>Book</button>
              </div>
              <p style={{ marginTop: '1rem', color: '#4b5563' }}>Facing battery issues? Our experts will get your vehicle running smoothly in no time.</p>

              {showBatteryForm && (
                <div style={{ marginTop: '1.5rem', backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontWeight: '600' }}>Request Battery Service</h4>
                    <X size={20} style={{ cursor: 'pointer' }} onClick={() => setShowBatteryForm(false)} />
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label>Service Type</label>
                    <select 
                      value={batteryService}
                      onChange={(e) => setBatteryService(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', marginTop: '0.25rem' }}
                    >
                      <option>Battery Replacement</option>
                      <option>Jump Start</option>
                      <option>Battery Testing</option>
                    </select>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label>Vehicle Make & Model</label>
                    <input 
                      type="text" 
                      placeholder="E.g., Toyota Camry 2020" 
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', marginTop: '0.25rem' }} 
                    />
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label>Your Location</label>
                    <input 
                      type="text" 
                      placeholder="Enter your address" 
                      value={batteryLocation}
                      onChange={(e) => setBatteryLocation(e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db', marginTop: '0.25rem' }} 
                    />
                  </div>
                  <button style={{ marginTop: '1rem', width: '100%', backgroundColor: '#4f46e5', color: 'white', padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}>Request Service</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Register Garage CTA */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#0f172a' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(29,78,216,0.2)', borderRadius: '50%', width: 64, height: 64, marginBottom: '1rem' }}>
            <Store size={28} color="#60a5fa" />
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>Own a Garage?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1rem', maxWidth: 480, margin: '0 auto 2rem' }}>
            Register on Garagify and start receiving service bookings from customers in your area.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/addstore')} style={{
              background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)',
              color: '#fff', border: 'none', padding: '0.85rem 1.75rem',
              borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
            }}>
              Register Your Garage
            </button>
            <button onClick={() => navigate('/garage')} style={{
              background: 'transparent', color: '#60a5fa',
              border: '1.5px solid #1e40af', padding: '0.85rem 1.75rem',
              borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
            }}>
              Garage Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
