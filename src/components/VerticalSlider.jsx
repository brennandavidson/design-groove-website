'use client';

import React, { useState, useEffect } from 'react';
import ProjectCursor from './ProjectCursor';
import { getProjects, urlFor } from '../lib/sanity';
import { useRouter } from 'next/navigation';

const VerticalSlider = ({ orientation = 'vertical' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("View Case Study");
  const [sliderItems, setSliderItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getProjects().then((data) => {
      // Filter and map to optimize images
      const validItems = data
        ?.filter(p => p.rawHeroImage || p.rawImage || p.heroImage || p.image)
        .map(p => {
          // Prioritize raw objects for optimization
          const source = p.rawHeroImage || p.rawImage;
          let imageUrl;
          if (source) {
            // Fetch width-constrained but aspect-ratio preserved image
            imageUrl = urlFor(source).width(1000).url();
          } else {
            // Fallback to string URL if raw object missing
            imageUrl = p.heroImage || p.image;
          }
          
          return {
            imageUrl,
            status: p.sliderHoverStatus || 'case-study', // Default to case-study if undefined
            slug: p.slug
          };
        });

      if (validItems && validItems.length > 0) {
        setSliderItems(validItems);
      }
    }).catch(err => {
      console.error("Slider fetch error:", err);
    });
  }, []);

  // --- Logic for Seamless Infinite Loop ---
  let baseSet = [...sliderItems];

  // If we have very few images (e.g. 1-3), duplicate them within the base set until we have at least 4.
  if (baseSet.length > 0 && baseSet.length < 4) {
    while (baseSet.length < 4) {
      baseSet = [...baseSet, ...baseSet];
    }
  }

  // The final display list is TWO copies of the base set.
  const displayItems = baseSet.length > 0 ? [...baseSet, ...baseSet] : [];

  // Dynamic Duration
  const speedPerImage = 8;
  const animationDuration = baseSet.length > 0 ? baseSet.length * speedPerImage : 40;

  const getCursorText = (status) => {
    switch (status) {
      case 'concept':
        return 'Concept Work';
      case 'coming-soon':
        return 'Case Study Coming Soon';
      default:
        return 'View Case Study';
    }
  };

  const isVertical = orientation === 'vertical';

  return (
    <div 
      className="infinite-slider-container"
      style={{ 
        height: '100%', 
        width: '100%',
        overflow: 'hidden', 
        position: 'relative',
        cursor: isHovered ? 'none' : 'default'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProjectCursor isHovered={isHovered} text={hoverText} />
      
      <style>{`
        @keyframes scrollUp {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes scrollRightToLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        
        /* Unique class based on orientation to prevent collisions */
        .slider-track-${orientation} {
          display: flex;
          flex-direction: ${isVertical ? 'column' : 'row'};
          animation: ${isVertical ? 'scrollUp' : 'scrollRightToLeft'} ${animationDuration}s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          width: ${isVertical ? '100%' : 'fit-content'};
          height: ${isVertical ? 'fit-content' : '100%'};
        }
        
        .infinite-slider-container:hover .slider-track-${orientation} {
          animation-play-state: ${isVertical ? 'paused' : 'running'};
        }
      `}</style>
      <div className={`slider-track-${orientation}`} style={{ pointerEvents: isVertical ? 'auto' : 'none' }}>
        {displayItems.map((item, index) => (
           <div 
           key={index}
           onMouseEnter={() => setHoverText(getCursorText(item.status))}
           onClick={() => {
             // Only allow navigation on vertical (desktop) orientation
             if (isVertical && item.status !== 'concept' && item.status !== 'coming-soon' && item.slug) {
               router.push(`/work/${item.slug.current}`);
             }
           }}
           style={{ 
             width: isVertical ? '100%' : 'auto', 
             height: isVertical ? 'auto' : '100%', 
             aspectRatio: 'auto', // Allow natural aspect ratio
             flexShrink: 0, 
             padding: '0',
             display: 'flex',
             position: 'relative',
             marginTop: isVertical ? '-1px' : '0',
             marginLeft: '0',
             transform: 'none',
             transformOrigin: 'center',
             cursor: isVertical ? 'none' : 'default' // Disable pointer cursor on mobile
           }}
         >
           <img 
             src={item.imageUrl} 
             alt="Work" 
            style={{ 
              width: isVertical ? '100%' : 'auto', 
              height: isVertical ? 'auto' : '100%', 
              objectFit: 'cover',
              display: 'block',
              backfaceVisibility: 'hidden',
              pointerEvents: 'none' // Prevent image drag/interaction
            }} 
          />
        </div>
       ))}
      </div>
    </div>
  );
};

export default VerticalSlider;