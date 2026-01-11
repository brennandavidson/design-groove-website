import React, { useEffect, useState } from 'react';
import { InlineWidget } from "react-calendly";
import { Helmet } from 'react-helmet-async';

const BookPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 900;

  // Prefetch Calendly resources for faster loading
  useEffect(() => {
    const domains = [
      'https://calendly.com',
      'https://assets.calendly.com',
      'https://cdn.cookielaw.org'
    ];

    const links = domains.flatMap(href => {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = href;

      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = href;

      document.head.appendChild(preconnect);
      document.head.appendChild(dnsPrefetch);

      return [preconnect, dnsPrefetch];
    });

    return () => {
      links.forEach(link => {
        if (document.head.contains(link)) document.head.removeChild(link);
      });
    };
  }, []);

  return (
    <div style={{
      paddingTop: isMobile ? '1rem' : '2rem',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Helmet>
        <title>Book a Call | Design Groove</title>
        <meta name="description" content="Schedule a discovery call with Design Groove to discuss your project goals." />
      </Helmet>

      {/* Calendly Inline Widget */}
      <div style={{
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0',
        padding: isMobile ? '0' : '0 2vw',
        overflowX: isMobile ? 'auto' : 'visible'
      }}>
        <InlineWidget
          url="https://calendly.com/designgroove/discovery-call?primary_color=0073e6&hide_gdpr_banner=1"
          styles={{
            height: isMobile ? '950px' : '1100px',
            width: '100%',
            maxWidth: '1200px'
          }}
        />
      </div>
    </div>
  );
};

export default BookPage;
