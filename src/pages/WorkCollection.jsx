import React, { useState, useEffect } from 'react';
import AnimatedHeading from '../components/AnimatedHeading';
import ProjectCursor from '../components/ProjectCursor';
import ProjectCard from '../components/ProjectCard';
import Contact from '../components/Contact';
import { getProjects } from '../lib/sanity';

const WorkCollection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Scroll to top on mount - REMOVED for App-level handling
    // window.scrollTo(0, 0);

    getProjects().then((data) => {
      if (data) {
        setProjects(data);
      }
    }).catch(err => console.error("Sanity Fetch Error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <style>{`
        .work-collection-padding {
          padding-top: 16rem !important; /* Matches Services.jsx desktop padding */
        }
        @media (max-width: 900px) {
          .work-collection-padding {
            padding-top: 10rem !important; /* Mobile: 6rem spacing + 4rem (approx 60px) nav allowance */
          }
        }
      `}</style>
      <section className="section-spacing work-collection-padding" style={{ 
        minHeight: '100vh' 
      }}>
        <Helmet>
          <title>Our Work | Design Groove</title>
          <meta name="description" content="Check out our recent projects. We help businesses grow through strategic design and development." />
        </Helmet>
        {/* Global Cursor for this section */}
        <ProjectCursor isHovered={hoveredProject !== null} />

        <div className="section-header-spacing" style={{ 
          paddingLeft: '4vw',
          paddingRight: '4vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Replaced AnimatedHeading with standard H1 to match Services page style exactly */}
          <h1 style={{ 
            fontFamily: 'Instrument Serif', 
            fontSize: windowWidth <= 900 ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)', 
            lineHeight: 1, 
            fontWeight: 400, 
            color: '#1a1a1a', 
            marginBottom: 0, // Removed margin to prevent stacking with container padding
            marginTop: 0 // Explicitly remove top margin to ensure exact padding match
          }}>
            <span style={{ color: '#1a1a1a' }}>Our </span>
            <span style={{ color: '#0078F2', fontStyle: 'italic' }}>Work</span>
          </h1>
        </div>

        {/* Aligned Grid Container */}
        <div className="work-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              setHoveredProject={setHoveredProject}
            />
          ))}
        </div>
      </section>
      
      <Contact />
    </div>
  );
};

export default WorkCollection;