import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { InlineWidget } from "react-calendly";
import Navbar from '../components/Navbar';
import FooterSky from '../components/FooterSky';

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

      <Navbar />

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
            margin: '0 auto 2.5rem'
          }}>
            Leads hit your phone by text. Reviews stack automatically. Old customers come back.<br className={isMobile ? 'hidden' : ''} />
            We build it in 7-10 days. You just answer your phone.
          </p>

          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            gap: isMobile ? '1rem' : '2rem',
            marginBottom: '4rem',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#0073E6' }}>✓</span> Leads Text Your Phone in Seconds
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#0073E6' }}>✓</span> Reviews Request Themselves
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#0073E6' }}>✓</span> Past Customers Reactivated
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#0073E6' }}>✓</span> Website Included
            </span>
          </div>

          {/* VSL PLACEHOLDER */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e0e0e0',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ textAlign: 'center', color: '#888' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>▶</div>
              <p>Video Sales Letter Placeholder</p>
            </div>
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

            {/* Logo Strip Placeholder */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '2rem', 
              opacity: 0.6, 
              marginBottom: '4rem',
              filter: 'grayscale(100%)'
            }}>
              {['Az Family Air', 'Trustworthy Air', 'ASH', 'Top Tech', 'Air Assurance', 'Az Cooling Specialists'].map(name => (
                <div key={name} style={{ 
                  padding: '1rem 2rem', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  fontWeight: 600 
                }}>
                  {name}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem' }}>
               {/* Video Testimonial 1 */}
               <div style={{
                aspectRatio: '16/9',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: '#666' }}>ASH Review Video</p>
              </div>
              {/* Video Testimonial 2 */}
              <div style={{
                aspectRatio: '16/9',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p style={{ color: '#666' }}>Rob Review Video</p>
              </div>
            </div>
          </div>
        </section>

        {/* CALENDAR SECTION */}
        <section style={{ 
          padding: '4rem 5vw 8rem', 
          backgroundColor: '#fff',
          textAlign: 'center' 
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '3rem',
              marginBottom: '1rem'
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

      </main>
      
      <FooterSky />
    </>
  );
};

export default HVACLanding;
