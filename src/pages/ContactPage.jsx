import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const ContactPage = () => {
  useEffect(() => {
    // window.scrollTo(0, 0); // Managed by App.jsx
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
    alert('Thanks for reaching out! We will get back to you shortly.');
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
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%', paddingTop: '100px' }}>
      
      <section style={{ 
        padding: '8rem 2vw', 
        maxWidth: '1800px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '4rem'
      }}>
        
        {/* Left Column: Heading & Info */}
        <div style={{ gridColumn: 'span 5' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontFamily: 'Instrument Serif', 
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', 
              lineHeight: 1, 
              color: '#1a1a1a', 
              marginBottom: '3rem',
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
                <a href="mailto:hello@designgroove.com" style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#4a4a4a', textDecoration: 'none' }}>hello@designgroove.com</a>
            </div>
            
            <div>
                <h3 style={{ fontFamily: 'Inter', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Socials</h3>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="https://www.linkedin.com/in/brennan-davidson9" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#4a4a4a', textDecoration: 'none' }}>LinkedIn</a>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: General Contact Form */}
        <div style={{ gridColumn: '7 / span 6' }}>
            <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
            >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
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
                        rows="4" 
                        value={formState.message} 
                        onChange={handleChange} 
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                        required
                    />
                </div>

                <div style={{ paddingTop: '1rem' }}>
                    <button 
                        type="submit"
                        style={{
                            padding: '16px 40px',
                            backgroundColor: '#1a1a1a',
                            color: '#ffffff',
                            border: '1px solid #1a1a1a',
                            borderRadius: '100px',
                            fontFamily: 'Inter',
                            fontSize: '1rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.color = '#1a1a1a';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#1a1a1a';
                            e.target.style.color = '#ffffff';
                        }}
                    >
                        Send Message
                    </button>
                </div>

            </motion.form>
        </div>

      </section>

      {/* Footer Contact Component - Keeping it as a global footer if desired, or we can remove it since this is the contact page. 
          Usually "Contact" component is the big "Ready to Talk" footer. 
          On the Contact Page, having a "Ready to Talk" footer below the contact form is redundant.
          I will remove the Contact footer from this page to avoid duplication.
      */}
      
    </div>
  );
};

export default ContactPage;
