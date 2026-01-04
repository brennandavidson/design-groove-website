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

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    getProjects().then((data) => {
      if (data) {
        setProjects(data);
      }
    }).catch(err => console.error("Sanity Fetch Error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <section style={{ 
        padding: '12rem 0 6rem', // Top padding to clear fixed navbar
        minHeight: '100vh' // Ensure section takes up full height to push footer down
      }}>
        {/* Global Cursor for this section */}
        <ProjectCursor isHovered={hoveredProject !== null} />

        <div style={{ 
          padding: '0 4vw 6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <AnimatedHeading 
            text="Work Collection"
            highlightWords={["Collection"]}
          />
        </div>

        {/* Aligned Grid Container */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          columnGap: '2vw', 
          rowGap: '6rem', 
          padding: '0 2vw', 
          maxWidth: '1800px', 
          margin: '0 auto'
        }}>
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