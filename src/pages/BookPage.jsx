import React, { useEffect } from 'react';
import { InlineWidget } from "react-calendly";

const BookPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ 
      paddingTop: '12rem', // Reduced to visually match the optical alignment of Services
      backgroundColor: '#ffffff', 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* Calendly Inline Widget using react-calendly for better control */}
      <div style={{ width: '100%', flex: 1, display: 'flex', justifyContent: 'center', marginBottom: '0', padding: '0 2vw' }}>
        <InlineWidget 
          url="https://calendly.com/designgroove/discovery-call?primary_color=0073e6"
          styles={{
            height: '1350px',
            width: '100%',
            maxWidth: '1200px'
          }}
        />
      </div>
    </div>
  );
};

export default BookPage;