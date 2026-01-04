import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProjectBySlug, urlFor } from '../lib/sanity';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import ProjectCard from '../components/ProjectCard';
import ProjectCursor from '../components/ProjectCursor';

// Custom component for rendering Sanity images in Portable Text
const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div style={{ margin: '4rem 0' }}>
          <img
            src={urlFor(value).width(1600).url()}
            alt={value.alt || 'Case study image'}
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '4px',
              display: 'block' 
            }}
          />
          {value.caption && (
            <p style={{ 
              fontFamily: 'Inter', 
              fontSize: '0.9rem', 
              color: '#666', 
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p style={{ 
        fontFamily: 'Inter', 
        fontSize: '1.1rem', 
        lineHeight: 1.6, 
        color: '#1a1a1a', 
        marginBottom: '1.5rem',
        maxWidth: '800px'
      }}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 style={{ 
        fontFamily: 'Instrument Serif', 
        fontSize: '2.5rem', 
        fontWeight: 400, 
        marginTop: '4rem', 
        marginBottom: '1.5rem',
        color: '#1a1a1a'
      }}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ 
        fontFamily: 'Instrument Serif', 
        fontSize: '2rem', 
        fontWeight: 400, 
        marginTop: '3rem', 
        marginBottom: '1rem',
        color: '#1a1a1a'
      }}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ 
        borderLeft: '2px solid #1a1a1a', 
        paddingLeft: '2rem', 
        marginLeft: 0,
        marginRight: 0,
        margin: '3rem 0',
        fontFamily: 'Instrument Serif',
        fontSize: '1.5rem',
        fontStyle: 'italic'
      }}>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>{children}</ul>,
    number: ({children}) => <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li style={{ fontFamily: 'Inter', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>{children}</li>,
    number: ({children}) => <li style={{ fontFamily: 'Inter', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>{children}</li>,
  }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    setIsLoading(true);

    getProjectBySlug(slug).then((data) => {
      if (data) {
        // Redirect if status is concept or coming-soon
        if (data.sliderHoverStatus === 'concept' || data.sliderHoverStatus === 'coming-soon') {
          navigate('/work', { replace: true });
        } else {
          setProject(data);
        }
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Project Fetch Error:", err);
      setIsLoading(false);
    });
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        width: '100%', 
        backgroundColor: '#ffffff',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        {/* Simple Loading State */}
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ 
        height: '100vh', 
        width: '100%', 
        backgroundColor: '#ffffff', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '100px'
      }}>
        <h2 style={{ fontFamily: 'Instrument Serif', fontSize: '3rem' }}>Project Not Found</h2>
        <Link to="/work" style={{ 
          marginTop: '2rem', 
          fontFamily: 'Inter', 
          textTransform: 'uppercase', 
          color: '#1a1a1a', 
          textDecoration: 'underline' 
        }}>
          Back to Work
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <ProjectCursor isHovered={hoveredProject !== null} />
      
      {/* Main Content */}
      <section style={{ 
        padding: '12rem 2vw 6rem', // Matches WorkCollection layout
        maxWidth: '1800px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem'
      }}>
        
        {/* Header: Title + Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontFamily: 'Instrument Serif', 
              fontSize: 'clamp(4rem, 8vw, 8rem)', 
              lineHeight: 1,
              fontWeight: 400,
              margin: 0,
              color: '#1a1a1a'
            }}
          >
            {project.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '4rem', 
              fontFamily: 'Inter', 
              fontSize: '0.9rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              color: '#1a1a1a'
            }}
          >
            <div>
              <span style={{ opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Category</span>
              {project.category}
            </div>
            <div>
              <span style={{ opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Year</span>
              {project.year}
            </div>
            {project.client && (
              <div>
                <span style={{ opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Client</span>
                {project.client}
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <span style={{ opacity: 0.5, display: 'block', marginBottom: '0.5rem' }}>Services</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.services.map((service, idx) => (
                    <span key={idx}>{service}{idx < project.services.length - 1 ? ', ' : ''}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
           style={{
             width: '100%',
             aspectRatio: '16/9',
             backgroundColor: '#f0f0f0',
             overflow: 'hidden',
             borderRadius: '4px',
             position: 'relative' // Added for absolute positioning of back button
           }}
        >
          {/* Back to Projects Button */}
          <Link 
            to="/work"
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              zIndex: 10,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#ffffff',
              padding: '12px 24px',
              borderRadius: '100px',
              color: '#1a1a1a',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
             <span style={{ fontSize: '1.1rem', lineHeight: 0, marginBottom: '2px' }}>&larr;</span>
             <span style={{ fontFamily: 'Instrument Serif', fontSize: '1.1rem', fontStyle: 'italic' }}>Back to Projects</span>
          </Link>

          {project.image && (
            <img 
              src={project.image} 
              alt={project.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </motion.div>

        {/* Content & Sidebar Layout */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8rem', // Increased gap for better pacing
          paddingTop: '6rem'
        }}>
          
          {/* Section 1: The Challenge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ maxWidth: '800px' }}>
              <h3 style={{ fontFamily: 'Instrument Serif', fontSize: '2rem', marginBottom: '1.5rem' }}>The Challenge</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8 }}>
                {project.challenge || 'Details on the challenge faced coming soon.'}
              </p>
            </div>
            {/* Always render container as placeholder, conditionally render image */}
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
              {project.challengeImage && (
                <img 
                  src={project.challengeImage} 
                  alt="Challenge context" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          {/* Section 2: What We Did */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'flex-start' }}>
            <div style={{ maxWidth: '800px', textAlign: 'left' }}> 
              <h3 style={{ fontFamily: 'Instrument Serif', fontSize: '2rem', marginBottom: '1.5rem' }}>What We Did</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8 }}>
                {project.solution || 'Details on the solution provided coming soon.'}
              </p>
            </div>
            {/* Always render container as placeholder, conditionally render image */}
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
              {project.solutionImage && (
                <img 
                  src={project.solutionImage} 
                  alt="Solution details" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          {/* Section 3: The Result */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ maxWidth: '800px' }}>
              <h3 style={{ fontFamily: 'Instrument Serif', fontSize: '2rem', marginBottom: '1.5rem' }}>The Result</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.8 }}>
                {project.result || 'Details on the final outcome coming soon.'}
              </p>
            </div>
            {/* REMOVED Result Image Container as per request */}
          </div>

          {/* Remaining Rich Content & Sidebar */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr', 
            gap: '4vw',
            borderTop: '1px solid #e5e5e5',
            paddingTop: '6rem'
          }}>
            {/* Main Case Study Content (Portable Text) */}
            <div>
              {/* If we have 'content', use PortableText. Fallback to description if not. */}
              {project.content ? (
                <PortableText value={project.content} components={myPortableTextComponents} />
              ) : (
                project.description && (
                  <>
                    <h3 style={{ 
                      fontFamily: 'Instrument Serif', 
                      fontSize: '2rem', 
                      marginBottom: '2rem', 
                      fontWeight: 400 
                    }}>
                      About the Project
                    </h3>
                    <p style={{ 
                      fontFamily: 'Inter', 
                      fontSize: '1.1rem', 
                      lineHeight: 1.6, 
                      color: '#1a1a1a', 
                      maxWidth: '800px',
                      whiteSpace: 'pre-wrap' 
                    }}>
                      {project.description}
                    </p>
                  </>
                )
              )}
            </div>

            {/* Sidebar / Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
              {project.link && (
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{
                     padding: '16px 32px',
                     backgroundColor: '#1a1a1a',
                     color: '#ffffff',
                     borderRadius: '100px',
                     textDecoration: 'none',
                     fontFamily: 'Inter',
                     fontSize: '0.9rem',
                     textTransform: 'uppercase',
                     letterSpacing: '0.05em',
                     display: 'inline-block',
                     position: 'sticky',
                     top: '120px' // Sticky Button
                   }}
                 >
                   Visit Website
                 </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* You Might Also Like Section */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section style={{ 
          padding: '0 2vw 12rem', 
          maxWidth: '1800px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '6rem'
        }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #e5e5e5', paddingBottom: '2rem' }}>
            <h2 style={{ 
              fontFamily: 'Instrument Serif', 
              fontSize: '3rem', 
              fontWeight: 400, 
              margin: 0,
              color: '#1a1a1a'
            }}>
              You Might Also Like
            </h2>
            <Link to="/work" style={{
               fontFamily: 'Inter',
               fontSize: '1rem',
               textTransform: 'uppercase',
               textDecoration: 'none',
               color: '#1a1a1a',
               borderBottom: '1px solid #1a1a1a',
               paddingBottom: '4px',
               letterSpacing: '0.05em'
            }}>
              View All Projects
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            columnGap: '2vw', 
            rowGap: '6rem' 
          }}>
            {project.relatedProjects.map((relatedProject, index) => (
              <ProjectCard
                key={relatedProject._id}
                project={relatedProject}
                index={index}
                setHoveredProject={setHoveredProject}
              />
            ))}
          </div>
        </section>
      )}

      <Contact />
    </div>
  );
};

export default ProjectDetail;