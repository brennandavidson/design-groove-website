import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { InlineWidget } from "react-calendly";
import FooterSky from '../components/FooterSky';
import HVACCredibility from '../components/HVACCredibility';

// Simple Navbar for Landing Page
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
        style={{ height: '32px', width: 'auto' }} 
      />
    </div>
  </nav>
);

const HVACLanding = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Helmet>
        <title>HVAC Lead System | Design Groove</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <LandingNavbar />

      <main style={{ backgroundColor: '#ffffff', color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}>
        
        {/* HERO SECTION */}
        <section style={{ 
          padding: isMobile ? '8rem 5vw 4rem' : '10rem 5vw 6rem',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontFamily: 'Instrument Serif, serif', 
            fontSize: isMobile ? '2.5rem' : '4rem', 
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: '#1a1a1a'
          }}>
            HVAC Owners: Get a Free Website<br />With This $297/mo Lead System
          </h1>
          
          <p style={{ 
            fontSize: isMobile ? '1.1rem' : '1.3rem', 
            lineHeight: 1.5,
            color: '#4a4a4a',
            maxWidth: '800px',
            margin: '0 auto 2.5rem',
            padding: '0 1rem'
          }}>
            Leads hit your phone by text. Reviews stack automatically. Old customers come back. We build it in 7-10 days. You just answer your phone.
          </p>

          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: isMobile ? '1rem' : '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto 4rem',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'left' }}>
              <span style={{ color: '#0073E6', flexShrink: 0, fontSize: '1.2em' }}>✓</span> 
              <span>Leads Text Your Phone in Seconds</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'left' }}>
              <span style={{ color: '#0073E6', flexShrink: 0, fontSize: '1.2em' }}>✓</span> 
              <span>Reviews Request Themselves</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'left' }}>
              <span style={{ color: '#0073E6', flexShrink: 0, fontSize: '1.2em' }}>✓</span> 
              <span>Past Customers Reactivated</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'left' }}>
              <span style={{ color: '#0073E6', flexShrink: 0, fontSize: '1.2em' }}>✓</span> 
              <span>Website Included</span>
            </div>
          </div>

          {/* VSL PLACEHOLDER */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '12px',
            margin: '0 auto 4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #333',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>▶</div>
              <p>Video Sales Letter Placeholder</p>
            </div>
          </div>

          {/* BOOKER - MOVED HERE */}
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '3rem',
              marginBottom: '1rem',
              marginTop: '0'
            }}>Ready to fix your leads?</h2>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
              Book a 15-min call. We'll show you how it works.
            </p>
            
            <InlineWidget
              url="https://calendly.com/designgroove/discovery-call?primary_color=0073e6&hide_gdpr_banner=1"
              styles={{
                height: '700px',
                width: '100%'
              }}
            />
          </div>

        </section>

        {/* HOW IT WORKS SECTION */}
        <section style={{ 
          padding: '4rem 5vw', 
          backgroundColor: '#f9f9f9',
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '3rem',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>How It Works</h2>

            {/* Redesigned Layout: Mockup Visual + Steps */}
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '3rem',
                alignItems: 'center'
            }}>
                
                {/* 1. The System Visual (Mockup) */}
                <div style={{
                    width: '100%',
                    maxWidth: '1000px',
                    position: 'relative'
                }}>
                    <img 
                        src="/assets/demo-site-mockup.png" 
                        alt="HVAC Lead System Dashboard" 
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '12px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>

                {/* 2. The 3 Steps Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', 
                  gap: '2rem',
                  width: '100%'
                }}>
                  {/* Step 1 */}
                  <div style={{ 
                    backgroundColor: '#fff', 
                    padding: '2rem', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      height: '60px', 
                      width: '60px',
                      backgroundColor: '#e6f2ff', 
                      borderRadius: '50%', 
                      marginBottom: '1.5rem',
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#0073E6',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      1
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Lead fills out form</h3>
                    <p style={{ color: '#666' }}>Customer requests a quote on your new site.</p>
                  </div>

                  {/* Step 2 */}
                  <div style={{ 
                    backgroundColor: '#fff', 
                    padding: '2rem', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      height: '60px', 
                      width: '60px',
                      backgroundColor: '#e6f2ff', 
                      borderRadius: '50%', 
                      marginBottom: '1.5rem',
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#0073E6',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      2
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>You get a text</h3>
                    <p style={{ color: '#666' }}>Notification hits your phone in seconds.</p>
                  </div>

                  {/* Step 3 */}
                  <div style={{ 
                    backgroundColor: '#fff', 
                    padding: '2rem', 
                    borderRadius: '12px', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                  }}>
                    <div style={{ 
                      height: '60px', 
                      width: '60px',
                      backgroundColor: '#e6f2ff', 
                      borderRadius: '50%', 
                      marginBottom: '1.5rem',
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#0073E6',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      3
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Close the job</h3>
                    <p style={{ color: '#666' }}>Reply directly to the text to start the conversation.</p>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION */}
        <section style={{ padding: '6rem 5vw', backgroundColor: '#fafafa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '3rem',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>Trusted by HVAC businesses nationwide</h2>

            {/* Featured Testimonial: Video (col 1) + Quote/Mockup stacked (col 2) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '2rem',
              alignItems: 'stretch',
              marginBottom: '4rem'
            }}>
              {/* Left Column: Video */}
              <div style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '400px',
                  aspectRatio: '9/16',
                  backgroundColor: '#e8e8e8',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  overflow: 'hidden'
                }}>
                  <p style={{ color: '#888' }}>ASH Video</p>
                </div>
              </div>

              {/* Right Column: Quote + Mockup stacked */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {/* Quote Section */}
                <div style={{
                  backgroundColor: '#fff',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
                }}>
                  <p style={{
                    fontSize: isMobile ? '1.1rem' : '1.25rem',
                    color: '#333',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem'
                  }}>
                    "They built our website and set up the lead system in about a week. Now when someone fills out the form, I get a text immediately. It's been a game changer for our business."
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#0073E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '1.1rem'
                    }}>
                      A
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: '#1a1a1a', margin: 0 }}>ASH Cooling & Heating</p>
                      <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Mesa, AZ</p>
                    </div>
                  </div>
                </div>

                {/* Mockup Section */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src="/assets/hvac-logos/ash-site-mockup.png"
                    alt="ASH Cooling & Heating Website"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Text Testimonials Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginBottom: '4rem'
            }}>
              {/* Testimonial 1 */}
              <div style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ color: '#0073E6', fontSize: '1.5rem', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1rem' }}>
                  "Finally, a marketing company that actually understands HVAC. No more chasing leads that go nowhere."
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>— HVAC Owner, Phoenix</p>
              </div>

              {/* Testimonial 2 */}
              <div style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ color: '#0073E6', fontSize: '1.5rem', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1rem' }}>
                  "The text notifications are instant. I've closed jobs while my competitors are still checking their email."
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>— HVAC Owner, Mesa</p>
              </div>

              {/* Testimonial 3 */}
              <div style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
              }}>
                <div style={{ color: '#0073E6', fontSize: '1.5rem', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ color: '#444', lineHeight: 1.6, marginBottom: '1rem' }}>
                  "Worth every penny. The review automation alone has doubled our Google reviews in 2 months."
                </p>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#666' }}>— HVAC Owner, Tempe</p>
              </div>
            </div>

            {/* Logo Strip at Bottom */}
            <HVACCredibility />
          </div>
        </section>

      </main>
      
      <FooterSky />
    </>
  );
};

export default HVACLanding;
