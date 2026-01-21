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
          padding: isMobile ? '8rem 5vw 4rem' : '10rem 5vw 6rem', // Increased top padding for absolute nav
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

           {/* MOCKUP PLACEHOLDER */}
           <div style={{
            width: '100%',
            maxWidth: '1000px',
            aspectRatio: '16/9',
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            margin: '0 auto 4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e0e0e0',
            position: 'relative',
            overflow: 'hidden'
          }}>
             <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>[INSERT MOCKUP IMAGE HERE]</p>
              <p>Upload the mockup (laptop/phone) image to /public/assets/ and reference it here.</p>
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

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', 
              gap: '2rem'
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
                  height: '200px', 
                  backgroundColor: '#eee', 
                  borderRadius: '8px', 
                  marginBottom: '1.5rem',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#666' 
                }}>
                  [Form Screenshot]
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Lead fills out form</h3>
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
                  height: '200px', 
                  backgroundColor: '#eee', 
                  borderRadius: '8px', 
                  marginBottom: '1.5rem',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#666' 
                }}>
                  [Phone Notification]
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. You get a text instantly</h3>
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
                  height: '200px', 
                  backgroundColor: '#eee', 
                  borderRadius: '8px', 
                  marginBottom: '1.5rem',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#666' 
                }}>
                  [Text Thread]
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. Conversation starts</h3>
                <p style={{ color: '#666' }}>You reply directly to close the job.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section style={{ padding: '6rem 5vw' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
             <h2 style={{ 
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '3rem',
              marginBottom: '3rem'
            }}>Trusted by HVAC Pros</h2>

            {/* Logo Strip Slider */}
            <HVACCredibility />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
               {/* Video Testimonial 1 - Mobile Portrait */}
               <div style={{
                width: isMobile ? '100%' : '300px',
                aspectRatio: '9/16',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '300px'
              }}>
                <p style={{ color: '#666' }}>ASH Review Video (9:16)</p>
              </div>
              {/* Video Testimonial 2 - Mobile Portrait */}
              <div style={{
                width: isMobile ? '100%' : '300px',
                aspectRatio: '9/16',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '300px'
              }}>
                <p style={{ color: '#666' }}>Rob Review Video (9:16)</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <FooterSky />
    </>
  );
};

export default HVACLanding;
