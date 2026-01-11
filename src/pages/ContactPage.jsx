import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 900;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xnjjawqn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 0',
    border: 'none',
    borderBottom: '1px solid #e5e5e5',
    backgroundColor: 'transparent',
    fontFamily: 'Inter',
    fontSize: '1rem',
    color: '#1a1a1a',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#0078F2',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <Helmet>
        <title>Contact | Design Groove</title>
        <meta name="description" content="Ready to start? Get in touch with us to discuss your project." />
      </Helmet>

      {/* Outer wrapper with side padding */}
      <section style={{
        padding: isMobile ? '10rem 4vw 4rem' : '16rem 4vw 6rem',
        width: '100%'
      }}>
        {/* Inner container with max-width */}
        <div style={{
          maxWidth: '1800px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
          gap: isMobile ? '3rem' : '4rem'
        }}>

        {/* Left Column: Heading & Info */}
        <div style={{ gridColumn: isMobile ? '1' : 'span 5' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 1,
              color: '#1a1a1a',
              marginBottom: isMobile ? '2rem' : '3rem',
              letterSpacing: '-0.02em'
            }}
          >
            Let's start a conversation.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div>
              <h3 style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</h3>
              <a href="mailto:hello@designgroove.com" style={{ fontFamily: 'Inter', fontSize: isMobile ? '1rem' : '1.1rem', color: '#4a4a4a', textDecoration: 'none' }}>hello@designgroove.com</a>
            </div>

            <div>
              <h3 style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Socials</h3>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="https://www.linkedin.com/in/brennan-davidson9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter', fontSize: isMobile ? '1rem' : '1.1rem', color: '#4a4a4a', textDecoration: 'none' }}>LinkedIn</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: General Contact Form */}
        <div style={{ gridColumn: isMobile ? '1' : '7 / span 6' }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '2rem' : '3rem' }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '2rem'
            }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  value={formState.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@company.com"
                  value={formState.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Company (Optional)</label>
              <input
                type="text"
                name="company"
                placeholder="Company Ltd."
                value={formState.company}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
              />
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={isMobile ? 5 : 4}
                value={formState.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                required
              />
            </div>

            <div style={{ paddingTop: isMobile ? '0.5rem' : '1rem' }}>
              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  padding: isMobile ? '14px 32px' : '16px 40px',
                  backgroundColor: status === 'submitting' ? '#666' : (isButtonHovered ? '#ffffff' : '#1a1a1a'),
                  color: status === 'submitting' ? '#ffffff' : (isButtonHovered ? '#1a1a1a' : '#ffffff'),
                  border: '1px solid',
                  borderColor: status === 'submitting' ? '#666' : '#1a1a1a',
                  borderRadius: '100px',
                  fontFamily: 'Inter',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  width: isMobile ? '100%' : 'auto',
                  opacity: status === 'submitting' ? 0.7 : 1
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* Success Message */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.5rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#0073E6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Instrument Serif', fontSize: '1.25rem', margin: 0, color: '#1a1a1a' }}>
                    Message sent!
                  </h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', margin: '0.25rem 0 0', color: '#666' }}>
                    We'll get back to you shortly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.5rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Instrument Serif', fontSize: '1.25rem', margin: 0, color: '#1a1a1a' }}>
                    Something went wrong
                  </h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', margin: '0.25rem 0 0', color: '#666' }}>
                    Please try again or email us directly.
                  </p>
                </div>
              </motion.div>
            )}

          </motion.form>
        </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;
