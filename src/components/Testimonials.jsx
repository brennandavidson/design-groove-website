import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';
import { getTestimonials } from '../lib/sanity';

// --- Data ---
// Skeleton data for initial render
const skeletonTestimonials = Array(8).fill(null).map((_, i) => ({
  _id: `skeleton-${i}`,
  quote: '',
  author: '',
  role: '',
  isSkeleton: true
}));

const fallbackTestimonials = [
  // ... (keep fallback data if needed, or remove if skeletons are sufficient)
  // Actually, we can just use skeletons until real data loads.
  { quote: "Looks better than I could have imagined! Seriously, the work is phenomenal!", author: "Hunter Rae", role: "Cosmetics Industry" },
  { quote: "Hands down the best web designer I’ve ever worked with", author: "Jeremy Bustin", role: "Headshot Photographer" },
  { quote: "Very attentive to what our website needed", author: "Parker Davies", role: "SaaS CEO" },
  { quote: "An ease to work with", author: "Tracy Ruiz", role: "Author" },
  { quote: "10/10 on all accounts 🙌🔥", author: "Derrik Mirochnik", role: "Marketing" },
  { quote: "Allowed my business to grow to the next level!", author: "Roman Matatov", role: "Barbershop Owner" },
  { quote: "Since partnering, we’ve been able to consistently deliver world class sites, lightning quick & at competitive rates", author: "Tristan Guilbealt", role: "Agency Owner" },
  { quote: "Just a joy to work with", author: "Adrienne Uthe", role: "Business Development" },
  { quote: "Design Groove's expertise in design and deep understanding of conversion strategies transformed our website, leading to tripled growth.", author: "Ciaran Mcintyre", role: "Ecom & Marketing" },
  { quote: "Design Groove did amazing work for me. They understood very fast what I was looking for.", author: "Ernesto Serna", role: "Branding Agency" }
];

// --- Components ---

const TestimonialCard = ({ item, index }) => {
  // Shared base styles
  const baseStyles = {
    width: '450px',
    maxWidth: '85vw',
    height: '320px',
    background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.02), 0 1px 3px rgba(0,0,0,0.02)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1rem',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <motion.div 
      style={baseStyles}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index ? index * 0.05 : 0 }} // Staggered fade in
    >
      {/* Quote Icon Background */}
      <div style={{
        position: 'absolute', top: '1rem', right: '2rem',
        fontSize: '10rem', color: 'rgba(0,115,230,0.03)',
        fontFamily: 'Instrument Serif', lineHeight: 0, pointerEvents: 'none',
        zIndex: 0
      }}>
        “
      </div>

      {/* Content Area - Grows to fill space */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        flexGrow: 1, 
        display: 'flex', 
        alignItems: 'flex-start' // Align text to top
      }}>
          <p style={{
              fontSize: '1.15rem', // Adjusted for new height
              fontFamily: 'Instrument Serif',
              color: '#1a1a1a',
              lineHeight: 1.3,
              fontStyle: 'italic',
              margin: 0
          }}>
              "{item.quote}"
          </p>
      </div>

      {/* Author Info - Pinned to bottom */}
      <div style={{ 
        marginTop: '2rem', // Ensure separation
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(0,0,0,0.05)', // Subtle separator to visually anchor the bottom
        width: '100%'
      }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', margin: 0, fontFamily: 'Inter' }}>
              {item.author}
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0', fontFamily: 'Inter' }}>
              {item.role}
          </p>
      </div>
      <style>{`
        /* ... styles ... */
      `}</style>
    </motion.div>
  );
};

const MarqueeRow = ({ items, direction = 'left', speed = 30 }) => {
  // Duplicate items to ensure smooth infinite scroll
  const marqueeItems = items.length > 0 ? [...items, ...items, ...items, ...items] : [];

  if (marqueeItems.length === 0) return null;

  return (
    <div style={{ 
        width: '100%', 
        overflow: 'hidden', 
        display: 'flex', 
        padding: '0.25rem 0',
        maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)', 
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
    }}>
      <motion.div
        style={{ display: 'flex', flexShrink: 0 }}
        animate={{ 
            x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] 
        }}
        transition={{ 
            duration: speed, 
            ease: "linear", 
            repeat: Infinity 
        }}
      >
        {marqueeItems.map((item, i) => (
          <TestimonialCard key={i} item={item} index={i} />
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  // Initialize with empty array to allow fade-in effect on mount
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials().then((data) => {
      console.log('Sanity Testimonials Fetch:', data);
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        // Only if fetch fails or returns empty, fallback to static data
        setTestimonials(fallbackTestimonials);
      }
    }).catch(err => {
      console.error("Failed to fetch testimonials:", err);
      // Fallback on error
      setTestimonials(fallbackTestimonials);
    });
  }, []);

  // Split based on CMS 'marqueeRow' field
  const row1 = testimonials.filter(t => t.marqueeRow === 'row1' || !t.marqueeRow); // Default to row1 if undefined
  const row2 = testimonials.filter(t => t.marqueeRow === 'row2');

  // If no row data exists (e.g. fallback data), use mathematical split
  if (testimonials.length > 0 && row1.length === testimonials.length && !testimonials[0].marqueeRow) {
      const midPoint = Math.ceil(testimonials.length / 2);
      return (
        <section className="section-spacing" style={{ 
          backgroundColor: '#fff', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Heading */}
          <div className="section-header-spacing-large" style={{ 
            paddingLeft: '4vw',
            paddingRight: '4vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <AnimatedHeading 
              text="Success Stories"
              highlightWords={["Stories"]}
            />
            <p style={{ 
                maxWidth: '600px', 
                marginTop: '1.5rem', 
                fontSize: '1.1rem', 
                color: '#666', 
                lineHeight: 1.6 
            }}>
                Join the founders and brands who have transformed their digital presence with us.
            </p>
          </div>

          {/* Marquee Rows Container */}
          <div style={{ 
            maxWidth: '1800px', 
            margin: '0 auto', 
            padding: '0 2vw', 
            display: 'flex', 
            flexDirection: 'column', 
          gap: '0.75rem' 
        }}>
          <MarqueeRow items={testimonials.slice(0, midPoint)} direction="left" speed={50} />
          <MarqueeRow items={testimonials.slice(midPoint)} direction="right" speed={55} />
        </div>

        </section>
      );
  }

  return (
    <section className="section-spacing" style={{ 
      backgroundColor: '#fff', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Heading */}
      <div className="section-header-spacing-large" style={{ 
        paddingLeft: '4vw',
        paddingRight: '4vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <AnimatedHeading 
          text="Success Stories"
          highlightWords={["Stories"]}
        />
        <p style={{ 
            maxWidth: '600px', 
            marginTop: '1rem', 
            fontSize: '1.1rem', 
            color: '#666', 
            lineHeight: 1.6 
        }}>
            Join the founders and brands who have transformed their digital presence with us.
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div style={{ 
        maxWidth: '1800px', 
        margin: '0 auto', 
        padding: '0 2vw', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem',
        minHeight: '700px' // Preserve layout space for loading state
      }}>
        <MarqueeRow items={row1} direction="left" speed={50} />
        <MarqueeRow items={row2} direction="right" speed={55} />
      </div>

    </section>
  );
};

export default Testimonials;
