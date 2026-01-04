import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';

const Statement = () => {
  return (
    <section className="section-spacing" style={{
      backgroundColor: '#ffffff',
      display: 'flex', // Changed to flex for easy centering
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      paddingBottom: '0' // Visual lockup with Credibility section
    }}>
      <div style={{ maxWidth: '900px' }}> {/* Centered container */}
        <AnimatedHeading 
          text="We build revenue systems for businesses that are done winging it."
          highlightWords={["revenue", "systems"]}
        />
      </div>
    </section>
  );
};

export default Statement;
