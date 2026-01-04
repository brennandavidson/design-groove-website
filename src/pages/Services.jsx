import React, { useRef, useState, useEffect, createRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact';

// --- DATA ---
const serviceData = [
  {
    title: "Strategy & Messaging",
    intro: "Define who you are and why you matter. Strategy, positioning, and identity systems built to be consistent, scalable, and unforgettable across every touchpoint.",
    items: [
      "Offer architecture",
      "Positioning and audience clarity",
      "Core messaging and voice",
      "Sales and launch copy",
      "Email sequences"
    ],
    image: "https://images.unsplash.com/photo-1506729623306-b5a934d88b53?q=80&w=2070&auto=format&fit=crop",
    shortDesc: "Positioning & Offer Design"
  },
  {
    title: "Brand & Design",
    intro: "Identity and interfaces built around how your audience actually buys. We craft visual systems that do the selling for you.",
    items: [
      "Visual identity design",
      "Website design",
      "Sales pages and landing pages",
      "Logo Design",
      "Pitch decks and presentations",
      "Brand guidelines"
    ],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    shortDesc: "Visual Identity Systems"
  },
  {
    title: "Development & Automation",
    intro: "Website, email, checkout, and backend systems that work together without constant manual work. Seamless tech stacks for scale.",
    items: [
      "Website development",
      "Email and CRM setup",
      "Payment and checkout integration",
      "Automations and integrations",
      "Tech stack optimization"
    ],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop",
    shortDesc: "Tech Stack & Systems"
  },
  {
    title: "Growth & Optimization",
    intro: "Measure, fix, iterate. Ongoing improvement after launch. We use data to refine the machine and increase conversion.",
    items: [
      "Copywriting & messaging",
      "Website & landing page copy",
      "Conversion optimization",
      "Launch execution",
      "Ongoing support"
    ],
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    shortDesc: "Scaling & Iteration"
  }
];

const faqData = [
  { 
    q: "How do I get started?", 
    a: (
      <>
        <Link to="/book" style={{ color: '#1a1a1a', textDecoration: 'underline', fontWeight: 500 }}>Book a call</Link> or fill out our <Link to="/contact" style={{ color: '#1a1a1a', textDecoration: 'underline', fontWeight: 500 }}>contact form</Link>. We’ll schedule a quick intro call to align on your goals, scope, and timeline. From there, we’ll craft a tailored proposal and set a clear start date that works for both of us.
      </>
    )
  },
  { q: "What if I only need part of the system?", a: "Some clients need the full build. Others need us to fix what's broken or fill specific gaps. We figure out the right scope on a call." },
  { q: "What do we need to provide to get started?", a: "Access to your existing assets (brand files, copy docs, current site) and clarity on what you're selling. If you don't have clarity on the offer yet, that's part of what we sort out in Phase 1." },
  { q: "Do you work with what I already have?", a: "Yes. If your brand, messaging, or tech is working, we build around it. The infrastructure wraps around what's already there." },
  { q: "What services does Design Groove offer?", a: "We build complete revenue systems: strategy, positioning, brand, website, funnel, automations, and ongoing tech support. Most clients need the full build. Some need specific pieces. Either way, everything we do is designed to work together." },
  { q: "How long does a project take?", a: "Most full scope projects run 4 to 6 weeks." },
  { q: "Will we have a dedicated project manager?", a: "You work directly with me. No account managers, no handoffs, no game of telephone. One point of contact from strategy through launch and beyond." },
  { q: "Do you offer ongoing support?", a: "Most clients stay on retainer after launch for tech support, new builds, and iteration. We become your embedded tech team." }
];

// --- COMPONENTS ---

// New OverviewItem Component for the top strip
const OverviewItem = ({ item, index, scrollToSection }) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
      onClick={scrollToSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        cursor: 'pointer',
        padding: '1rem 0', // Reduced padding since border is gone
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Align to top
        gap: '1.5rem', // Space between elements
        height: '100%',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ 
          fontFamily: 'Inter', 
          fontSize: '0.95rem', 
          fontWeight: 600, 
          color: '#0078F2', // Pop of Blue
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateX(5px)' : 'translateX(0)' 
        }}>
          {formattedIndex}
        </span>
        <motion.span 
          animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
          style={{ fontSize: '1.2rem', color: '#0078F2' }} // Matching Blue Arrow
        >
          →
        </motion.span>
      </div>
      
      <div>
        <h3 style={{ 
          fontFamily: 'Instrument Serif', 
          fontSize: '2rem', 
          color: '#1a1a1a', 
          marginBottom: '1rem',
          lineHeight: 1.1
        }}>
          {item.title}
        </h3>
        <p style={{ 
          fontFamily: 'Inter', 
          fontSize: '1rem', 
          color: '#666',
          lineHeight: 1.5,
          maxWidth: '90%'
        }}>
          {item.shortDesc}
        </p>
      </div>
    </motion.div>
  );
};

const AccordionItem = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div style={{ borderBottom: '1px solid #e5e5e5' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          padding: '2rem 0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', // Align to top for multi-line questions
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', gap: '2rem' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: '#999', paddingTop: '0.4rem' }}>{formattedIndex}</span>
            <span style={{ fontFamily: 'Instrument Serif', fontSize: '1.5rem', color: '#1a1a1a', maxWidth: '600px' }}>{q}</span>
        </div>
        <span style={{ fontSize: '1.5rem', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', opacity: 0.5 }}>+</span>
      </button>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ paddingLeft: 'calc(2rem + 0.9rem + 4px)', paddingBottom: '2rem', maxWidth: '800px' }}>
             <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.6, color: '#4a4a4a' }}>{a}</p>
        </div>
      </motion.div>
    </div>
  );
};

// Component to detect when a section is in view
// Forwarding ref to allow parent to track scroll progress
const ServiceSection = React.forwardRef(({ service, index }, ref) => {
  
  // Split items into two even columns
  const midPoint = Math.ceil(service.items.length / 2);
  const leftCol = service.items.slice(0, midPoint);
  const rightCol = service.items.slice(midPoint);
  
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div 
      ref={ref}
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        padding: '6rem 0',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Number Marker - Floating, subtle */}
        <span style={{ display: 'block', fontFamily: 'Inter', fontSize: '0.9rem', color: '#999', marginBottom: '1rem' }}>
            {formattedIndex}
        </span>

        {/* Title: H2 size */}
        <h2 style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1, fontWeight: 400, color: '#1a1a1a', marginBottom: '2rem' }}>
          {service.title}
        </h2>
        
        {/* Description */}
        <p style={{ fontFamily: 'Inter', fontSize: '1.25rem', lineHeight: 1.5, color: '#1a1a1a', marginBottom: '4rem', maxWidth: '600px' }}>
          {service.intro}
        </p>
        
        {/* 2-Column List Layout (No Bullets): Smaller, Lighter, Tighter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {leftCol.map((item, i) => (
              <span key={i} style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#888', lineHeight: 1.4 }}>
                {item}
              </span>
            ))}
          </div>
          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {rightCol.map((item, i) => (
              <span key={i} style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#888', lineHeight: 1.4 }}>
                {item}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
});

// Component to handle the sticky image reveal based on scroll
const StickyImageLayer = ({ service, triggerRef, index, isFirst }) => {
  // Use scroll progress of the corresponding text section
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    // Start revealing when the top of the text section hits the bottom of the viewport
    // End revealing when the top of the text section hits the center of the viewport (or slightly earlier to lock it in)
    offset: ["start end", "center center"] 
  });

  // Map scroll progress to a clip-path "wipe" effect from bottom to top
  // If it's the first image, it's always fully visible (no mask)
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: '#fff',
        zIndex: index,
        clipPath: isFirst ? "inset(0% 0 0 0)" : clipPath,
        willChange: 'clip-path'
      }}
    >
      <img 
        src={service.image} 
        alt={service.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </motion.div>
  );
};

const ServicesPage = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Create refs for each text section to track their scroll progress
  const sectionRefs = useRef(serviceData.map(() => createRef()));

  // Scroll to top on mount and handle resize
  useEffect(() => {
    window.scrollTo(0, 0);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToContact = () => {
    // Navigate to /book instead of scrolling
    window.location.href = '/book';
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      
      {/* Header Section - Enhanced Padding and Structure */}
      {/* Increased top padding to 20rem to match Statement.jsx and push sticky content down */}
      <section style={{ padding: '16rem 2vw 12rem', maxWidth: '1800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1, fontWeight: 400, color: '#1a1a1a', marginBottom: '2rem' }}
        >
          Everything your business<br />needs to sell
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontFamily: 'Inter', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.6, color: '#4a4a4a', maxWidth: '600px', margin: '0 auto 2rem auto' }}
        >
          Strategy, brand, website, automation, and ongoing support from one team that gets how it all connects.
        </motion.p>

        {/* Main CTA Button */}
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={scrollToContact}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            style={{
                backgroundColor: isButtonHovered ? '#333' : '#1a1a1a',
                color: '#fff',
                border: '1px solid #1a1a1a', // Added border
                padding: '12px 24px', // Updated padding to match nav
                borderRadius: '100px', // Updated radius to match nav
                fontFamily: 'Inter',
                fontSize: '0.9rem', // Updated font size
                textTransform: 'uppercase', // Added transform
                fontWeight: 500, // Added weight
                letterSpacing: '0.05em', // Added letter spacing
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                display: 'inline-block'
            }}
        >
            Get in Touch
        </motion.button>
      </section>

      {/* NEW: What We Do Overview Strip - Clean Row Layout (No Borders) */}
      <section style={{ 
        marginBottom: '25vh' // Significant gap to ensure image is hidden on load
      }}>
        <div style={{ 
          maxWidth: '1800px', 
          margin: '0 auto', 
          padding: '0 2vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {serviceData.map((s, index) => (
            <OverviewItem 
              key={index} 
              item={s} 
              index={index} 
              scrollToSection={() => {
                const targetRef = sectionRefs.current[index];
                if (targetRef && targetRef.current) {
                  targetRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
            />
          ))}
        </div>
      </section>

      {/* Main Content: Sticky Image + Scrolling Text */}
      <section style={{ width: '100%', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: windowWidth > 900 ? '1fr 1fr' : '1fr' }}>
          
          {/* LEFT: Scrolling Text Sections */}
          {/* We apply padding here to align with the rest of the site's 1800px max-width container */}
          {/* Left padding = max(2vw, space to align with 1800px container) */}
          <div style={{ 
            paddingLeft: 'max(2vw, calc((100vw - 1800px) / 2 + 2vw))', 
            paddingRight: '4rem',
            paddingBottom: '10vh'
          }}>
            {serviceData.map((service, index) => (
              <ServiceSection 
                key={index}
                // Store ref in our array to track this section's position
                ref={sectionRefs.current[index]}
                service={service} 
                index={index} 
              />
            ))}
          </div>

          {/* RIGHT: Sticky Image Container with Scroll-Driven Mask Reveal */}
          {/* Full Bleed Right Column */}
          {windowWidth > 900 && (
            <div style={{ position: 'relative', height: '100%' }}>
              <div style={{ 
                position: 'sticky', 
                top: '100px', // Aligned to bottom of 100px sticky Navbar
                width: '100%',
                height: 'calc(100vh - 100px)', // Fill the vertical space
                overflow: 'hidden',
                backgroundColor: '#f0f0f0' // Base background
              }}>
                {serviceData.map((service, index) => (
                   <StickyImageLayer 
                      key={index}
                      service={service}
                      // Pass the corresponding text section ref to drive the animation
                      triggerRef={sectionRefs.current[index]}
                      index={index}
                      isFirst={index === 0}
                   />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* FAQ Section - Clean Layout */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '12rem 2vw' }}>
         <h2 style={{ fontFamily: 'Instrument Serif', fontSize: '4rem', fontWeight: 400, color: '#1a1a1a', marginBottom: '6rem', textAlign: 'center' }}>
           Questions?
         </h2>
         <div>
           {faqData.map((item, i) => (
             <AccordionItem key={i} q={item.q} a={item.a} index={i} />
           ))}
         </div>
      </section>

      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default ServicesPage;