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
          padding: isMobile ? '7rem 5vw 0' : '9rem 5vw 0',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: isMobile ? '2.2rem' : '3.5rem',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            color: '#1a1a1a'
          }}>
            See how HVAC owners are using this system to <span style={{ color: '#0073E6' }}>GROW</span> their business for only $297/mo (No agency fees. No ad budgets. No bullsh*t.)
          </h1>

          <p style={{
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            fontWeight: 600,
            color: '#1a1a1a',
            margin: '0 auto 1rem'
          }}>
            🎁 PLUS... it comes with a free website
          </p>

          <p style={{
            fontSize: isMobile ? '1rem' : '1.15rem',
            lineHeight: 1.5,
            color: '#555',
            maxWidth: '700px',
            margin: '0 auto 2.5rem'
          }}>
            👇 Watch this 6 minute video to see EXACTLY how it works and why it makes you more money
          </p>

          {/* VSL PLACEHOLDER */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '12px',
            margin: '0 auto 2rem',
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

          {/* BOOKER */}
          <div id="booker" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '2.75rem',
              marginBottom: '0.5rem',
              marginTop: '0'
            }}>Book a call below 👇</h2>

            <div style={{
              height: isMobile ? '950px' : '750px',
              overflow: 'hidden'
            }}>
              <InlineWidget
                url="https://calendly.com/designgroove/hvac-marketing-system-demo?primary_color=0073e6&hide_gdpr_banner=1"
                styles={{
                  height: '1200px',
                  width: '100%'
                }}
              />
            </div>
          </div>

        </section>

        {/* SOCIAL PROOF SECTION */}
        <section style={{ padding: isMobile ? '0 5vw 2rem' : '0 5vw 3rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Section Header */}
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '2.75rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>Hear from an HVAC owner like you</h2>

            {/* Featured Testimonial: Video (col 1) + Quote/Mockup stacked (col 2) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '2rem',
              alignItems: 'start',
              marginBottom: '3rem'
            }}>
              {/* Left Column: Video */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '400px',
                  borderRadius: '16px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  overflow: 'hidden'
                }}>
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    style={{
                      width: '100%',
                      display: 'block',
                      objectFit: 'cover'
                    }}
                  >
                    <source src="/assets/IMG_9746.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
                    "We went from a <strong>$2,900 investment</strong> to a <strong>$22,000 profit margin</strong>. From the website to the marketing strategies, it's top notch. If you're thinking about giving them a shot, don't hesitate."
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
                      <p style={{ fontWeight: 600, color: '#1a1a1a', margin: 0 }}>Ashton, ASH Cooling & Heating</p>
                      <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Mesa, AZ</p>
                    </div>
                  </div>
                </div>

                {/* Mockup Section */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center'
                }}>
                  <img
                    src="/assets/hvac-logos/ash-site-mockup.png"
                    alt="ASH Cooling & Heating Website"
                    style={{
                      maxWidth: '85%',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Heading for logo strip */}
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '2.75rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>Trusted by HVAC businesses nationwide</h2>

            {/* Logo Strip */}
            <HVACCredibility />
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section style={{ padding: isMobile ? '2rem 5vw' : '3rem 5vw' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '3rem',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>How It Works</h2>
            <p style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '1.1rem',
              marginBottom: '3rem'
            }}>From form submission to closed deal in seconds</p>

            {/* 3-Panel Visual Flow */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
              gap: isMobile ? '2rem' : '1.5rem',
              alignItems: 'start'
            }}>

              {/* Panel 1: Form Mockup */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '24px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  padding: '0.5rem',
                  marginBottom: '1.5rem',
                  maxWidth: '280px',
                  margin: '0 auto 1.5rem'
                }}>
                  <div style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: '20px',
                    padding: '1rem',
                    height: '280px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      padding: '0.6rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                      textAlign: 'center'
                    }}>Get a Free Quote</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                      <div style={{
                        backgroundColor: '#fff',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#333',
                        textAlign: 'left',
                        border: '1px solid #e0e0e0'
                      }}>John Smith</div>
                      <div style={{
                        backgroundColor: '#fff',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#333',
                        textAlign: 'left',
                        border: '1px solid #e0e0e0'
                      }}>(480) 555-1234</div>
                      <div style={{
                        backgroundColor: '#fff',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#333',
                        textAlign: 'left',
                        border: '1px solid #e0e0e0',
                        flex: 1
                      }}>AC not cooling, need someone ASAP</div>
                      <div style={{
                        backgroundColor: '#0073E6',
                        color: '#fff',
                        padding: '0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textAlign: 'center'
                      }}>Submit</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>1. Lead fills out form</div>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>Customer submits a quote request</p>
              </div>

              {/* Panel 2: Phone Notification Mockup */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '24px',
                  padding: '0.5rem',
                  maxWidth: '280px',
                  margin: '0 auto 1.5rem'
                }}>
                  <div style={{
                    backgroundColor: '#000',
                    borderRadius: '20px',
                    padding: '1rem',
                    height: '280px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.97)',
                      borderRadius: '14px',
                      padding: '0.85rem',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      width: '100%'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          backgroundColor: '#34C759',
                          borderRadius: '5px',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>💬</div>
                        <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>MESSAGES</span>
                        <span style={{ fontSize: '0.7rem', color: '#999', marginLeft: 'auto' }}>now</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.35rem' }}>New Lead: John Smith</div>
                      <div style={{ fontSize: '0.8rem', color: '#444', lineHeight: 1.4 }}>"AC not cooling, need someone ASAP" - (480) 555-1234</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>2. You get a text instantly</div>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>Lead details hit your phone in seconds</p>
              </div>

              {/* Panel 3: Text Conversation Mockup */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '24px',
                  padding: '0.5rem',
                  maxWidth: '280px',
                  margin: '0 auto 1.5rem'
                }}>
                  <div style={{
                    backgroundColor: '#000',
                    borderRadius: '20px',
                    padding: '1rem 0.75rem',
                    height: '280px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid #333'
                    }}>John Smith</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
                      <div style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '14px 14px 14px 4px',
                        fontSize: '0.8rem',
                        maxWidth: '88%',
                        alignSelf: 'flex-start'
                      }}>AC not cooling, need someone ASAP</div>
                      <div style={{
                        backgroundColor: '#0073E6',
                        color: '#fff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '14px 14px 4px 14px',
                        fontSize: '0.8rem',
                        maxWidth: '88%',
                        alignSelf: 'flex-end'
                      }}>Hey John! I can be there in 45 min. Work for you?</div>
                      <div style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '14px 14px 14px 4px',
                        fontSize: '0.8rem',
                        maxWidth: '88%',
                        alignSelf: 'flex-start'
                      }}>Yes! Thank you 🙏</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>3. Close the job</div>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>Reply directly and book the appointment</p>
              </div>

            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section style={{
          padding: isMobile ? '3rem 5vw' : '4rem 5vw',
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '2.75rem',
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#1a1a1a'
            }}>
              Ready to get MORE calls and MORE reviews for just $297/mo?
            </h2>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.15rem',
              color: '#555',
              marginBottom: '1.5rem',
              lineHeight: 1.6
            }}>
              Book a 15-minute call. We'll show you exactly how the system works and get you set up in 7-10 days.
            </p>
            <a
              href="#booker"
              style={{
                display: 'inline-block',
                backgroundColor: '#0073E6',
                color: '#fff',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#005bb5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0073E6'}
            >
              Book My Call
            </a>
          </div>
        </section>

      </main>

      <FooterSky />
    </>
  );
};

export default HVACLanding;
