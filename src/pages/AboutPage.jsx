import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Credibility from '../components/Credibility';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AnimatedHeading from '../components/AnimatedHeading';

// Reveal Animation Variant
const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const AboutPage = () => {
  const [windowWidth, setWindowWidth] = React.useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 900;

  useEffect(() => {
    // window.scrollTo(0, 0); // Managed by App.jsx
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <Helmet>
        <title>About | Design Groove</title>
        <meta name="description" content="Meet the team behind Design Groove. Strategy, design, development, and automation under one roof." />
      </Helmet>
      
      {/* 1. HERO / OPENING FRAME */}
      {/* Editorial Style: Massive Typographic Statement */}
      <section style={{
        padding: isMobile ? '10rem 4vw 4rem' : '16rem 4vw 6rem',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center'
        }}> 
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            style={{
              fontFamily: 'Instrument Serif',
              fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)',
              lineHeight: 1,
              color: '#1a1a1a',
              marginBottom: '2rem',
              letterSpacing: '0',
              fontWeight: 400,
              textAlign: 'center',
              maxWidth: '1200px', // Constrain width
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            Strategy, design, development, and automation under one roof.
          </motion.h1>
          
          <div style={{ 
            marginTop: isMobile ? '4rem' : '25vh', // Adjusted margin for mobile
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', // Stack on mobile
            gap: isMobile ? '4rem' : '2rem', // Increased gap for stacked layout
            width: '100%'
          }}>
            {[
              {
                title: "Strategy before design.",
                desc: "Every project starts with figuring out what we're building and why. Positioning, messaging, customer journey. The blueprint comes before the visuals."
              },
              {
                title: "Everything connected.",
                desc: "Website, email sequences, automations, payment systems. Built by a team that understands how all the pieces talk to each other. Nothing duct-taped."
              },
              {
                title: "Ongoing partnership.",
                desc: "Most clients stay on after launch. New pages, new sequences, troubleshooting, optimization. Your system evolves with your business."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  textAlign: 'left', // Keep text left aligned
                  gap: '1.5rem',
                  height: '100%'
                }}
              >
                <span style={{ 
                  fontFamily: 'Inter', 
                  fontSize: '0.95rem', 
                  fontWeight: 600, 
                  color: '#0078F2', 
                  display: 'block' 
                }}>
                  0{index + 1}
                </span>
                
                <div>
                  <h3 style={{ 
                    fontFamily: 'Instrument Serif', 
                    fontSize: '2rem', 
                    lineHeight: 1.1, 
                    color: '#1a1a1a', 
                    marginBottom: '1rem' 
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '1rem', 
                    lineHeight: 1.5, 
                    color: '#666', 
                    maxWidth: '90%' 
                  }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROOF - MOVED UP */}
      <Credibility />

      {/* 3. WHO'S BEHIND IT */}
      {/* Modern Card Layout */}
      <section style={{ padding: isMobile ? '0 4vw 4rem' : '0 4vw 6rem', width: '100%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                style={{
                  backgroundColor: '#f8f8f8', // Subtle card background
                  borderRadius: '24px',
                  padding: isMobile ? '3rem 1.5rem' : '5rem', // Reduced padding on mobile
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: isMobile ? '2rem' : '3rem'
                }}
            >
                {/* Circle Headshot */}
                <div style={{ 
                    width: isMobile ? '140px' : '180px', // Smaller on mobile
                    height: isMobile ? '140px' : '180px',
                    borderRadius: '50%', // Circle mask
                    overflow: 'hidden',
                    backgroundColor: '#e5e5e5',
                    border: '4px solid #ffffff', // White border ring
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    flexShrink: 0
                }}>
                    <img 
                        src="/assets/headshot.png" 
                        alt="Brennan Davidson" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                {/* Content */}
                <div style={{ maxWidth: '700px' }}>
                    <span style={{ 
                      display: 'block', 
                      fontFamily: 'Inter', 
                      fontSize: '0.9rem', 
                      color: '#0078F2', 
                      marginBottom: '1rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em',
                      fontWeight: 600
                    }}>
                        Meet the Founder
                    </span>
                    
                    <h2 style={{ 
                      fontFamily: 'Instrument Serif', 
                      fontSize: isMobile ? '2.5rem' : '3.5rem', // Smaller heading
                      lineHeight: 1, 
                      color: '#1a1a1a', 
                      marginBottom: '2rem' 
                    }}>
                        Brennan Davidson
                    </h2>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                      fontFamily: 'Inter',
                      fontSize: isMobile ? '1rem' : '1.15rem',
                      lineHeight: 1.6,
                      color: '#4a4a4a'
                    }}>
                        <p>
                            I started in design, taught myself development and automation, and eventually realized the most useful thing I could do was handle the whole system. Design Groove has been doing that since 2020.
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>
      </section>

      {/* 4. PROOF */}
      {/* Integrated cleanly */}
      {/* <section style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <Credibility />
      </section> */}
      
      <div style={{ marginBottom: isMobile ? '-2rem' : '0' }}>
        <Testimonials />
      </div>

      <div id="contact">
        <Contact />
      </div>

    </div>
  );
};

export default AboutPage;
