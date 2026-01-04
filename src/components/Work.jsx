import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';
import ProjectCursor from './ProjectCursor';
import ProjectCard from './ProjectCard';
import { getProjects } from '../lib/sanity';

const Work = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    getProjects().then((data) => {
      console.log('Sanity Projects Fetch:', data);
      if (data) {
        // Filter out projects that are marked to be hidden from this list
        const visibleProjects = data.filter(p => p.showInWorkList !== false);
        setProjects(visibleProjects);
      }
    }).catch(err => console.error("Sanity Fetch Error:", err));
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <section className="section-spacing" style={{ backgroundColor: '#ffffff' }}>
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
        <AnimatedHeading 
          text="Recent Projects"
          highlightWords={["Projects"]}
        />
      </div>

      {/* Aligned Grid Container */}
      <div className="work-grid">
        {projects.slice(0, visibleCount).map((project, index) => (
          <ProjectCard
            key={project._id}
            project={project}
            index={index}
            setHoveredProject={setHoveredProject}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < projects.length && (
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '6rem' 
        }}>
          <button 
            onClick={handleLoadMore}
            style={{
              background: 'transparent',
              border: '1px solid #e5e5e5',
              padding: '1rem 3rem',
              borderRadius: '50px',
              fontFamily: 'Inter',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#1a1a1a';
              e.target.style.backgroundColor = '#1a1a1a';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e5e5e5';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#1a1a1a';
            }}
          >
            See More
          </button>
        </div>
      )}
    </section>
  );
};

export default Work;
