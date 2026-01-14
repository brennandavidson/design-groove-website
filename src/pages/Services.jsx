import React, { useRef, useState, useEffect, createRef } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValueEvent, AnimatePresence, useSpring } from 'framer-motion';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact';
import { StrategyWidget, BrandDesignWidget, DevelopmentWidget, GrowthWidget } from '../components/ServiceWidgets';

// --- DATA ---
const serviceData = [
  {
    title: "Strategy & Messaging",
    intro: "Define who you are and why you matter. Strategy, positioning, and identity systems built to be scalable.",
    items: [
      "Offer architecture",
      "Core messaging and voice",
      "Sales and launch copy",
      "Positioning and audience clarity",
      "Email sequences"
    ],
    image: "https://images.unsplash.com/photo-1506729623306-b5a934d88b53?q=80&w=2070&auto=format&fit=crop",
    shortDesc: "Positioning & Offer Design",
    widget: <StrategyWidget />
  },
  {
    title: "Brand & Design",
    intro: "Identity and interfaces built around how your audience actually buys. We craft visual systems that do the selling for you.",
    items: [
      "Visual identity design",
      "Website design",
      "Sales pages and landing pages",
      "Pitch decks and presentations",
      "Logo Design",
      "Brand guidelines"
    ],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    shortDesc: "Visual Identity Systems",
    widget: <BrandDesignWidget />
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
    shortDesc: "Tech Stack & Systems",
    widget: <DevelopmentWidget />
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
    shortDesc: "Scaling & Iteration",
    widget: <GrowthWidget />
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
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToSection();
        }
      }}
      role="button"
      tabIndex={0}
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

// New Mobile Scroll Layout Component
const MobileScrollLayout = ({ serviceData }) => {
  console.log("MobileScrollLayout rendering, serviceData:", serviceData?.length);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!serviceData || serviceData.length === 0) return;
    const total = serviceData.length;
    const index = Math.min(
      Math.floor(latest * total),
      total - 1
    );
    setActiveIndex(index);
  });

  if (!serviceData || serviceData.length === 0) return null;


  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: `${serviceData.length * 100}vh`, // 100vh per slide
        position: 'relative' 
      }}
    >
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        overflow: 'hidden',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 5
      }}>
        
        {/* Top: Image Area */}
        <div style={{ 
          height: '50vh', // Fixed height for image area
          width: '100%', 
          position: 'relative',
          marginTop: '60px' // Align to top of sticky container + nav height (60px)
        }}>
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                zIndex: index, // Base stacking order
              }}
              initial={false} // Prevent initial animation on mount
              animate={{ 
                clipPath: index <= activeIndex ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
              }}
              transition={{ duration: 1, ease: "easeInOut" }} // Smoother transition
            >
              {service.widget ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
                    {/* Inject scale prop for mobile */}
                    {React.cloneElement(service.widget, { scale: 0.65 })}
                </div>
              ) : (
                <img
                    src={getUnsplashUrl(service.image, 800)}
                    srcSet={`
                    ${getUnsplashUrl(service.image, 400)} 400w,
                    ${getUnsplashUrl(service.image, 800)} 800w
                    `}
                    sizes="100vw"
                    alt={service.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                    }} 
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Middle: Progress Bar */}
        <div style={{ 
          width: 'calc(100% - 8vw)', // Match padding
          height: '4px', 
          backgroundColor: '#eee',
          borderRadius: '2px',
          margin: '1.5rem auto', // Center horizontally, spacing vert
          overflow: 'hidden',
          flexShrink: 0 // Prevent squishing
        }}>
          <motion.div 
            style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#000',
              transformOrigin: 'left',
              scaleX: smoothProgress
            }}
          />
        </div>

        {/* Bottom: Text Content */}
        <div style={{ 
          flex: 1, 
          position: 'relative', 
          width: '100%',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                padding: '0 4vw 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
                <span style={{ display: 'block', fontFamily: 'Inter', fontSize: '0.9rem', color: '#999', marginBottom: '0.5rem' }}>
                    {(activeIndex + 1).toString().padStart(2, '0')}
                </span>
                <h2 style={{ fontFamily: 'Instrument Serif', fontSize: '2.5rem', lineHeight: 1.1, color: '#1a1a1a', marginBottom: '1rem' }}>
                    {serviceData[activeIndex].title}
                </h2>
                <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.5, color: '#4a4a4a', marginBottom: '1.5rem' }}>
                    {serviceData[activeIndex].intro}
                </p>
                
                {/* Items List - Desktop style (clean text list) */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '0.5rem 1rem', 
                    marginTop: '1rem', 
                    paddingBottom: '1rem' 
                }}>
                    {serviceData[activeIndex].items.map((item, i) => (
                          <span key={i} style={{ 
                              fontFamily: 'Inter', 
                              fontSize: '0.85rem', 
                              color: '#595959', // Darker grey for contrast (AA compliant)
                              lineHeight: 1.4
                          }}>
                            {item}
                          </span>
                    ))}
                </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

// Component to detect when a section is in view
// Forwarding ref to allow parent to track scroll progress
const ServiceSection = React.forwardRef(({ service, index, isMobile }, ref) => {
  
  // Split items into two even columns
  const midPoint = Math.ceil(service.items.length / 2);
  const leftCol = service.items.slice(0, midPoint);
  const rightCol = service.items.slice(midPoint);
  
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div 
      ref={ref}
      style={{ 
        minHeight: isMobile ? 'auto' : '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        padding: isMobile ? '4rem 4vw' : '6rem 0', // Reset mobile padding
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
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', // Stack on mobile
          gap: isMobile ? '1rem' : '2rem', 
          maxWidth: '800px' 
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {leftCol.map((item, i) => (
              <span key={i} style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#595959', lineHeight: 1.4 }}>
                {item}
              </span>
            ))}
          </div>
          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {rightCol.map((item, i) => (
              <span key={i} style={{ fontFamily: 'Inter', fontSize: '0.95rem', color: '#595959', lineHeight: 1.4 }}>
                {item}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
});

// Helper to optimize Unsplash URLs
const getUnsplashUrl = (url, width) => {
  if (!url) return '';
  const baseUrl = url.split('?')[0];
  return `${baseUrl}?q=80&w=${width}&auto=format&fit=crop`;
};

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
      {service.widget ? (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
            {service.widget}
        </div>
      ) : (
        <img 
            src={getUnsplashUrl(service.image, 1600)}
            srcSet={`
            ${getUnsplashUrl(service.image, 800)} 800w,
            ${getUnsplashUrl(service.image, 1200)} 1200w,
            ${getUnsplashUrl(service.image, 2000)} 2000w
            `}
            sizes="(max-width: 900px) 100vw, 50vw"
            alt={service.title}
            loading={isFirst ? "eager" : "lazy"}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
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
    // window.scrollTo(0, 0); // Managed by App.jsx
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
      <SEO
        title="Services - Strategy, Brand, Web Development & Automation"
        description="Full-service web design and digital marketing: strategy and positioning, brand identity, website design and development, email automation, CRM setup, and ongoing optimization. Everything your service business needs to convert and scale."
        keywords="web design services, digital marketing services, brand identity design, website development, email automation, CRM setup, conversion optimization, business automation, marketing strategy, sales funnel development"
        breadcrumb={[
          { name: 'Home', url: 'https://designgroove.io' },
          { name: 'Services', url: 'https://designgroove.io/services' }
        ]}
      />
      
      {/* Header Section - Enhanced Padding and Structure */}
      {/* Increased top padding to 20rem to match Statement.jsx and push sticky content down */}
      <section style={{ 
        padding: windowWidth <= 900 ? '10rem 4vw 4rem' : '16rem 4vw 12rem', 
        width: '100%', 
        textAlign: 'center' 
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ 
            fontFamily: 'Instrument Serif', 
            fontSize: windowWidth <= 900 ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)', 
            lineHeight: 1, 
            fontWeight: 400, 
            color: '#1a1a1a', 
            marginBottom: 0, // Removed margin to prevent stacking with container padding
            textWrap: 'balance', // Improves wrapping on mobile
            maxWidth: '100%',
            margin: '0 auto 0 auto' // Removed bottom margin here too
          }}
        >
          {windowWidth <= 900 ? (
            "Everything your business needs to sell"
          ) : (
            <>Everything your business<br />needs to sell</>
          )}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontFamily: 'Inter', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.6, color: '#4a4a4a', maxWidth: '600px', margin: '1rem auto 2rem auto' }} // Standardized to 1rem top margin
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
            Book a Call
        </motion.button>
      </section>

      {/* NEW: What We Do Overview Strip - Clean Row Layout (No Borders) */}
      {/* HIDDEN ON MOBILE as requested */}
      {windowWidth > 900 && (
        <section style={{ 
          marginBottom: '25vh', // Significant gap to ensure image is hidden on load
          padding: '0 4vw' // Added padding to container
        }}>
          <div style={{ 
            maxWidth: '1800px', 
            margin: '0 auto', 
            padding: '0', // Removed padding from grid
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
      )}

      {/* Main Content: Sticky Image + Scrolling Text */}
      <section style={{ width: '100%', position: 'relative' }}>
        {windowWidth > 900 ? (
          /* DESKTOP LAYOUT */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            
            {/* LEFT: Scrolling Text Sections */}
            <div style={{ 
              paddingLeft: 'max(4vw, calc((100vw - 1800px) / 2))',
              paddingRight: '4rem',
              paddingBottom: '10vh'
            }}>
              {serviceData.map((service, index) => (
                <ServiceSection 
                  key={index}
                  ref={sectionRefs.current[index]}
                  service={service} 
                  index={index} 
                  isMobile={false}
                />
              ))}
            </div>

            {/* RIGHT: Sticky Image Container */}
            <div style={{ position: 'relative', height: '100%' }}>
              <div style={{ 
                position: 'sticky', 
                top: '100px', 
                width: '100%',
                height: 'calc(100vh - 100px)', 
                overflow: 'hidden',
                backgroundColor: '#f0f0f0' 
              }}>
                {serviceData.map((service, index) => (
                   <StickyImageLayer 
                      key={index}
                      service={service}
                      triggerRef={sectionRefs.current[index]}
                      index={index}
                      isFirst={index === 0}
                   />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* MOBILE LAYOUT - Pinned Scroll with Progress */
          <MobileScrollLayout serviceData={serviceData} />
        )}
      </section>

      {/* FAQ Section - Clean Layout */}
      <section style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: windowWidth <= 900 ? '4rem 4vw' : '12rem 4vw' 
      }}>
         <h2 style={{ 
           fontFamily: 'Instrument Serif', 
           fontSize: 'clamp(2.5rem, 4vw, 4rem)', 
           fontWeight: 400, 
           color: '#1a1a1a', 
           marginBottom: windowWidth <= 900 ? '2rem' : '6rem', // Reduced to 2rem on mobile
           textAlign: 'center' 
         }}>
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