import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// Simple Navbar for Landing Page (matches HVACLanding)
const LandingNavbar = () => (
  <nav style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '2rem 4vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'transparent'
  }}>
    <div style={{ display: 'block' }}>
      <img
        src="/assets/dg-logo-dark.svg"
        alt="Design Groove"
        width="120"
        height="32"
        style={{ height: '32px', width: 'auto' }}
      />
    </div>
  </nav>
);

const HVACThankYou = () => {
  // Fire conversion events on page load
  useEffect(() => {
    // GTM dataLayer event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'lead', lead_source: 'hvac_landing' });
    }
    // Meta Pixel Lead event
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>You're Booked! | Design Groove</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <LandingNavbar />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem'
          }}>
            🎉
          </div>

          <h1 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: '2.5rem',
            lineHeight: 1.2,
            marginBottom: '1rem',
            color: '#1a1a1a'
          }}>
            You're all set!
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#555',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}>
            Check your email for the calendar invite. We'll see you on the call!
          </p>

          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '1rem',
              color: '#333',
              margin: 0,
              lineHeight: 1.6
            }}>
              <strong>Before the call:</strong> Think about how many leads you're currently getting per month and what your average job value is. This will help us show you exactly what's possible.
            </p>
          </div>

          <a
            href="/1-stop-hvac"
            style={{
              display: 'inline-block',
              color: '#0073E6',
              fontSize: '1rem',
              textDecoration: 'none'
            }}
          >
            ← Back to landing page
          </a>
        </div>
      </div>
    </>
  );
};

export default HVACThankYou;
