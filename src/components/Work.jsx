'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';
import ProjectCursor from './ProjectCursor';
import ProjectCard from './ProjectCard';
import { getProjects } from '../lib/sanity';

const Work = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // Skeleton data for initial render to prevent CLS
  const skeletonProjects = Array(4).fill(null).map((_, i) => ({
    _id: `skeleton-${i}`,
    title: 'Loading Project',
    category: 'Category',
    year: 'Year',
    slug: { current: '#' },
    isSkeleton: true
  }));

  const [projects, setProjects] = useState(skeletonProjects);
  const [visibleCount, setVisibleCount] = useState(4);

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getProjects().then((data) => {
      console.log('Sanity Projects Fetch:', data);
      if (data && data.length > 0) {
        // Filter out projects that are marked to be hidden from this list
        const visibleProjects = data.filter(p => p.showInWorkList !== false);
        setProjects(visibleProjects);
      }
    }).catch(err => {
      console.error("Sanity Fetch Error:", err);
      // Keep skeletons or empty state? Skeletons might be confusing if error persists.
      // But for CLS, keeping them is better than collapsing.
    });
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX or actual async operation
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setLoadingMore(false);
    }, 500);
  };

  return (
    <section className="section-spacing" style={{ backgroundColor: '#ffffff' }}>
      <ProjectCursor isHovered={hoveredProject !== null} />
      
      <style>{`
        @media (max-width: 900px) {
           /* Hide custom cursor on mobile to prevent it showing on tap */
           .project-cursor-container {
             display: none !important;
           }
        }
      `}</style>

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
          marginTop: '2.5rem' // Increased from 1.5rem
        }}>
          <button 
            onClick={handleLoadMore}
            disabled={loadingMore}
            style={{
              background: loadingMore ? '#1a1a1a' : 'transparent',
              border: '1px solid #e5e5e5',
              borderColor: loadingMore ? '#1a1a1a' : '#e5e5e5',
              padding: '1rem 3rem',
              borderRadius: '50px',
              fontFamily: 'Inter',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: loadingMore ? '#ffffff' : '#1a1a1a',
              cursor: loadingMore ? 'wait' : 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none',
              minWidth: '180px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 1
            }}
            onMouseEnter={(e) => {
              if (loadingMore) return;
              e.target.style.borderColor = '#1a1a1a';
              e.target.style.backgroundColor = '#1a1a1a';
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              if (loadingMore) return;
              e.target.style.borderColor = '#e5e5e5';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#1a1a1a';
            }}
          >
            {loadingMore ? 'Loading...' : 'See More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Work;
