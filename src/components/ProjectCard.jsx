import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, index, setHoveredProject }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    setHoveredProject(project._id);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setHoveredProject(null);
  };

  return (
    <Link 
      to={project.slug ? `/work/${project.slug.current}` : '#'}
      style={{ textDecoration: 'none', display: 'block', width: '100%' }}
    >
      <motion.div
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
          marginBottom: '2rem'
        }}>
          {project.image && (
            <motion.img 
              src={project.image} 
              alt={project.title}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
              }}
              animate={{ scale: isHovered ? 1.03 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>

        {/* Footer Info (Below Image) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'baseline', 
          padding: '0 0.5rem'
        }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontFamily: 'Instrument Serif', 
            fontWeight: 400,
            margin: 0,
            color: '#1a1a1a'
          }}>
            {project.title}
          </h3>
          <div style={{ 
            fontFamily: 'Inter', 
            fontSize: '0.85rem', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            opacity: 0.6,
            color: '#1a1a1a' // Explicit color to override Link default
          }}>
            {project.category} — {project.year}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;

