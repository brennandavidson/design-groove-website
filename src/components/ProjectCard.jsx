import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';

const ProjectCard = ({ project, index, setHoveredProject }) => {
  const [isHovered, setHovered] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Handle video ready state
  const handleVideoCanPlay = () => {
    setIsVideoReady(true);
  };

  // Handle video play/pause on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && isVideoReady) {
        // Play video when hovered and video is ready
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Video play failed (likely due to user interaction policy):", error);
          });
        }
      } else if (!isHovered) {
        // Pause and reset when not hovered
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isVideoReady]);

  // Track global mouse position to check hover status during scroll
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smart hover check on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isHovered && cardRef.current) {
        // Check if the mouse is still over the card element
        const elementUnderMouse = document.elementFromPoint(mouseRef.current.x, mouseRef.current.y);
        
        // If the element under mouse is NOT the card or inside the card, disable hover
        if (elementUnderMouse && !cardRef.current.contains(elementUnderMouse)) {
          setHovered(false);
          setHoveredProject(null);
        }
      }
    };

    if (isHovered) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHovered, setHoveredProject]);

  const handleMouseEnter = () => {
    // Disable hover effects on mobile/tablet (using 900px breakpoint)
    if (window.innerWidth <= 900) return;
    setHovered(true);
    setHoveredProject(project._id);
  };

  const handleMouseLeave = () => {
    // Consistent check although less critical for leave
    if (window.innerWidth <= 900) return;
    setHovered(false);
    setHoveredProject(null);
  };

  return (
    <Link
      to={project.slug ? `/work/${project.slug.current}` : '#'}
      className="project-card-link"
      style={{ textDecoration: 'none', display: 'block', width: '100%' }}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          cursor: 'none', // Hide default cursor only when hovering the CARD
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '1px'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div style={{
          width: '100%',
          aspectRatio: '1.2',
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
          position: 'relative',
          marginBottom: '2rem',
          // Prevent sub-pixel rendering issues
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}>
          {project.image ? (
            <>
              {/* Optional Hover Video */}
              {project.hoverVideo && (
                <video
                  ref={videoRef}
                  src={project.hoverVideo}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onCanPlayThrough={handleVideoCanPlay}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate(-50%, -50%) scale(1.001)',
                    zIndex: 1,
                    opacity: isHovered && isVideoReady ? 1 : 0,
                    transition: 'opacity 0.4s ease-out',
                    imageRendering: 'crisp-edges'
                  }}
                />
              )}

              <img
                src={project.rawImage ? urlFor(project.rawImage).width(800).url() : project.image}
                srcSet={project.rawImage ? `
                  ${urlFor(project.rawImage).width(600).url()} 600w,
                  ${urlFor(project.rawImage).width(900).url()} 900w,
                  ${urlFor(project.rawImage).width(1200).url()} 1200w
                ` : undefined}
                sizes="(max-width: 900px) 100vw, 50vw"
                alt={project.title}
                loading={index < 2 ? "eager" : "lazy"} // Eager load first 2
                width="800" // Explicit width/height to prevent CLS
                height="666" // Aspect ratio 1.2
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 0
                }}
              />
            </>
          ) : (
            // Placeholder/Skeleton Style
            <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0' }} />
          )}
        </div>

        {/* Footer Info (Below Image) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          padding: '0 0.5rem',
          flexWrap: 'wrap', 
          rowGap: '0.5rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ 
              fontSize: '2rem', 
              fontFamily: 'Instrument Serif', 
              fontWeight: 400,
              margin: 0,
              color: '#1a1a1a',
              lineHeight: 1.1
            }}>
              {project.title}
            </h3>
            
            {/* View Project -> (Now below title on Mobile) */}
            <div className="mobile-only" style={{
              fontFamily: 'Instrument Serif',
              fontSize: '1.25rem', 
              color: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '1rem' // More top padding
            }}>
              <span style={{ fontStyle: 'italic' }}>View</span> Project &rarr;
            </div>
          </div>
          
            {/* Category — Year (Back to Right Side for All Screens) */}
          <div style={{ 
            fontFamily: 'Inter', 
            fontSize: '0.85rem', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#1a1a1a', // No opacity changes
            alignSelf: 'flex-start', // Changed from baseline to flex-start
            marginTop: '0.6rem' // Visual adjustment to align with Title cap height
          }}>
            {project.category} — {project.year}
          </div>
        </div>
        
        <style>{`
          /* Override global link hover opacity for project cards */
          .project-card-link,
          .project-card-link:hover {
            opacity: 1 !important;
          }
        `}</style>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;