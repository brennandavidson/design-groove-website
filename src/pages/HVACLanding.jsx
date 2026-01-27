import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import HVACCredibility from '../components/HVACCredibility';

// Lazy load Cal.com to prevent loading on page load
const Cal = lazy(() => import('@calcom/embed-react').then(mod => ({ default: mod.default })));

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
        width="120"
        height="32"
        style={{ height: '32px', width: 'auto' }}
      />
    </div>
  </nav>
);

// Play button overlay for video facades
const PlayButton = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'rgba(0,0,0,0.3)',
    pointerEvents: 'none'
  }}>
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#0073E6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>
  </div>
);

const HVACLanding = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loadVSL, setLoadVSL] = useState(false);
  const [loadTestimonial, setLoadTestimonial] = useState(false);
  const [loadCal, setLoadCal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const howItWorksRef = useRef(null);
  const calRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Document-level event delegation for video buttons (iOS Safari compatible)
  useEffect(() => {
    const handleVideoClick = (e) => {
      // Find the button with data-video-id (could be target or ancestor)
      let target = e.target;
      while (target && target !== document.body) {
        const videoId = target.getAttribute('data-video-id');
        if (videoId) {
          e.preventDefault();
          e.stopPropagation();

          if (videoId === '40b82242-a8f5-4be5-8dc1-2115ab37dd7a') {
            setLoadVSL(true);
          } else if (videoId === 'eb803435-50c6-47bb-b214-8ee4b6e80a18') {
            setLoadTestimonial(true);
          }
          return;
        }
        target = target.parentElement;
      }
    };

    // Use capture phase to get events before React
    document.addEventListener('click', handleVideoClick, true);
    document.addEventListener('touchstart', handleVideoClick, true);

    return () => {
      document.removeEventListener('click', handleVideoClick, true);
      document.removeEventListener('touchstart', handleVideoClick, true);
    };
  }, []);

  // Use desktop styles until mounted to prevent flash
  const mobile = mounted ? isMobile : false;


  // Lazy load Cal.com when booker section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadCal(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    if (calRef.current) observer.observe(calRef.current);
    return () => observer.disconnect();
  }, []);

  // Lazy load How It Works section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowHowItWorks(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    return () => observer.disconnect();
  }, []);

  
  return (
    <>
      <Helmet>
        <title>HVAC Lead System | Design Groove</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="See how HVAC owners are using this system to grow their business for only $297/mo. No agency fees. No ad budgets." />
        <link rel="preload" href="/assets/hvac-vsl-thumbnail.jpg" as="image" fetchpriority="high" />
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
            👇 Watch this 4 minute video to see EXACTLY how it works and why it makes you more money
          </p>

          {/* VSL - Click to load */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto 2rem',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#000'
          }}>
            <div style={{
              position: 'relative',
              paddingTop: '56.25%'
            }}>
              {loadVSL ? (
                <iframe
                  src="https://iframe.mediadelivery.net/embed/585643/40b82242-a8f5-4be5-8dc1-2115ab37dd7a?autoplay=true&muted=false&preload=true&responsive=true"
                  style={{
                    border: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%'
                  }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  data-video-id="40b82242-a8f5-4be5-8dc1-2115ab37dd7a"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    backgroundColor: '#0a0a0a',
                    border: 'none',
                    padding: 0,
                    margin: 0
                  }}
                >
                  <img
                    src="/assets/hvac-vsl-thumbnail.jpg"
                    alt="Watch video"
                    fetchPriority="high"
                    onError={(e) => { e.target.style.display = 'none'; }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      pointerEvents: 'none'
                    }}
                  />
                  <PlayButton />
                </button>
              )}
            </div>
          </div>

          {/* BOOKER */}
          <div id="booker" ref={calRef} style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: isMobile ? '2rem' : '2.75rem',
              marginBottom: '0.5rem',
              marginTop: '0'
            }}>Book a call below 👇</h2>

            <div style={{
              height: isMobile ? '700px' : '750px',
              overflow: 'scroll'
            }}>
              {loadCal ? (
                <Suspense fallback={
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px'
                  }}>
                    <p style={{ color: '#666' }}>Loading scheduler...</p>
                  </div>
                }>
                  <Cal
                    namespace="one-stop-hvac-system-demo"
                    calLink="team/design-groove/one-stop-hvac-system-demo"
                    style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                    config={{ layout: 'month_view', theme: 'light' }}
                  />
                </Suspense>
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px'
                }}>
                  <p style={{ color: '#666' }}>Loading scheduler...</p>
                </div>
              )}
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
            }}>See what our client Ashton had to say...</h2>

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
                  overflow: 'hidden',
                  backgroundColor: '#000'
                }}>
                  <div style={{
                    position: 'relative',
                    paddingTop: '177.78%',
                    minHeight: isMobile ? '500px' : '600px'
                  }}>
                    {loadTestimonial ? (
                      <iframe
                        src="https://iframe.mediadelivery.net/embed/585643/eb803435-50c6-47bb-b214-8ee4b6e80a18?autoplay=true&muted=false&preload=true&responsive=true"
                        style={{
                          border: 0,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: '100%'
                        }}
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        data-video-id="eb803435-50c6-47bb-b214-8ee4b6e80a18"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                          backgroundColor: '#0a0a0a',
                          border: 'none',
                          padding: 0,
                          margin: 0
                        }}
                      >
                        <img
                          src="/assets/hvac-testimonial-thumbnail.jpg"
                          alt="Watch testimonial"
                          loading="lazy"
                          onError={(e) => { e.target.style.display = 'none'; }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            pointerEvents: 'none'
                          }}
                        />
                        <PlayButton />
                      </button>
                    )}
                  </div>
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
                    "We went from <strong>10 Google reviews to over 70</strong> in less than a year. Did over <strong>$480,000 in sales</strong>. It's simple to use—I don't have to think about it. Everything comes to your phone, you hit the button and you go."
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
                  <picture>
                    <source srcSet="/assets/hvac-logos/ash-site-mockup.webp" type="image/webp" />
                    <img
                      src="/assets/hvac-logos/ash-site-mockup.png"
                      alt="ASH Cooling & Heating Website"
                      width="600"
                      height="450"
                      loading="lazy"
                      decoding="async"
                      style={{
                        maxWidth: '85%',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </picture>
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
        <section ref={howItWorksRef} style={{ padding: isMobile ? '2rem 5vw' : '3rem 5vw', minHeight: '600px' }}>
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
            }}>See EXACTLY how our system helps you make more money...</p>

            {/* 3-Panel Visual Flow - Lazy loaded */}
            {showHowItWorks ? (
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
                      borderRadius: '16px',
                      padding: '0.85rem',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      width: '100%',
                      textAlign: 'left'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#34C759',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <svg width="14" height="14" viewBox="0 0 32 32" fill="#fff">
                            <path d="M16 3C8.82 3 3 8.82 3 16c0 2.96 1 5.69 2.67 7.88L3 29l5.5-2.4C10.56 28.14 13.16 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"/>
                          </svg>
                        </div>
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
                }}>2. They get a text. You get a text.</div>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>Lead gets an instant response and you get notified automatically.</p>
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
                        alignSelf: 'flex-start',
                        textAlign: 'left'
                      }}>AC not cooling, need someone ASAP</div>
                      <div style={{
                        backgroundColor: '#0073E6',
                        color: '#fff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '14px 14px 4px 14px',
                        fontSize: '0.8rem',
                        maxWidth: '88%',
                        alignSelf: 'flex-end',
                        textAlign: 'left'
                      }}>Hey John! I can be there in 45 min. Work for you?</div>
                      <div style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '14px 14px 14px 4px',
                        fontSize: '0.8rem',
                        maxWidth: '88%',
                        alignSelf: 'flex-start',
                        textAlign: 'left'
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

              {/* Panel 4: Missed Call Auto-Response */}
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                      {/* Missed call notification */}
                      <div style={{
                        backgroundColor: 'rgba(255,255,255,0.97)',
                        borderRadius: '16px',
                        padding: '0.85rem',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                        textAlign: 'left'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#FF3B30',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.31 1.62.56 2.41a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.79.25 1.6.43 2.41.56A2 2 0 0 1 22 16.92z"/>
                            </svg>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>PHONE</span>
                          <span style={{ fontSize: '0.7rem', color: '#999', marginLeft: 'auto' }}>now</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FF3B30', marginBottom: '0.2rem' }}>Missed Call</div>
                        <div style={{ fontSize: '0.8rem', color: '#444' }}>(480) 555-9876</div>
                      </div>
                      {/* Auto text response */}
                      <div style={{
                        backgroundColor: 'rgba(255,255,255,0.97)',
                        borderRadius: '16px',
                        padding: '0.85rem',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                        textAlign: 'left'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            backgroundColor: '#34C759',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <svg width="14" height="14" viewBox="0 0 32 32" fill="#fff">
                              <path d="M16 3C8.82 3 3 8.82 3 16c0 2.96 1 5.69 2.67 7.88L3 29l5.5-2.4C10.56 28.14 13.16 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"/>
                            </svg>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600 }}>MESSAGES</span>
                          <span style={{ fontSize: '0.7rem', color: '#34C759', fontWeight: 600, marginLeft: 'auto' }}>auto-sent</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.2rem' }}>Auto-Reply</div>
                        <div style={{ fontSize: '0.8rem', color: '#444', lineHeight: 1.4 }}>"Hey! Sorry we missed your call. How can we help?"</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>4. Miss a call? No problem.</div>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>System texts them back automatically</p>
              </div>

              {/* Panel 5: Review Request */}
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
                        backgroundColor: '#0073E6',
                        color: '#fff',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '14px 14px 4px 14px',
                        fontSize: '0.8rem',
                        maxWidth: '90%',
                        alignSelf: 'flex-end',
                        lineHeight: 1.5,
                        textAlign: 'left'
                      }}>Thanks for choosing us! Mind leaving a quick review? ⭐</div>
                      <div style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '14px 14px 14px 4px',
                        fontSize: '0.8rem',
                        maxWidth: '85%',
                        alignSelf: 'flex-start',
                        lineHeight: 1.5,
                        textAlign: 'left'
                      }}>Done! You guys are the best 👍</div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.2rem',
                        fontSize: '1.3rem',
                        marginTop: '0.75rem'
                      }}>⭐⭐⭐⭐⭐</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>5. 5-STAR reviews on autopilot</div>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>One-click auto-reminds customers till they review. Bad reviews don't hit your Google.</p>
              </div>

              {/* Panel 6: 12-Month Follow-up */}
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
                      marginBottom: '0.25rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid #333'
                    }}>Sarah Johnson</div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#666',
                      textAlign: 'center',
                      padding: '0.5rem 0'
                    }}>6 months since last service</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, justifyContent: 'center' }}>
                      <div style={{
                        backgroundColor: '#0073E6',
                        color: '#fff',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '14px 14px 4px 14px',
                        fontSize: '0.8rem',
                        maxWidth: '90%',
                        alignSelf: 'flex-end',
                        lineHeight: 1.5,
                        textAlign: 'left'
                      }}>Hey Sarah! Time for your AC tune-up. Want to schedule?</div>
                      <div style={{
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '14px 14px 14px 4px',
                        fontSize: '0.8rem',
                        maxWidth: '85%',
                        alignSelf: 'flex-start',
                        lineHeight: 1.5,
                        textAlign: 'left'
                      }}>Perfect timing! Yes please 🙌</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>6. Past customers reactivated</div>
                <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>12-month follow-ups for referrals + repeat business</p>
              </div>

            </div>
            ) : (
              <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#999' }}>Loading...</p>
              </div>
            )}
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
              Book a 30-minute call. We'll show you exactly how the system works and get you set up in 7-10 days.
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
    </>
  );
};

export default HVACLanding;
