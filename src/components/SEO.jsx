import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { OrganizationJsonLd, WebsiteJsonLd, LocalBusinessJsonLd, BreadcrumbJsonLd, ProjectJsonLd, ServiceJsonLd } from './JsonLd';

const SEO = ({ 
  title, 
  description, 
  image = 'https://designgroove.io/og-image.jpg', 
  type = 'website',
  article = false,
  breadcrumb = [],
  project = null,
  service = null
}) => {
  const location = useLocation();
  const siteUrl = 'https://designgroove.io';
  const url = `${siteUrl}${location.pathname}`;
  const siteName = 'Design Groove';
  const defaultDescription = 'Design Groove is a web design and marketing agency building high-converting websites and digital systems for service businesses ready to scale.';
  const metaDescription = description || defaultDescription;
  const metaTitle = title ? `${title} | ${siteName}` : `${siteName} | Digital Agency`;

  return (
    <>
      <Helmet>
        {/* Standard Metadata */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={image} />

        {/* Article Specific */}
        {article && <meta property="article:author" content="Design Groove" />}
      </Helmet>

      {/* Structured Data */}
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <LocalBusinessJsonLd />
      {breadcrumb.length > 0 && <BreadcrumbJsonLd items={breadcrumb} />}
      {project && <ProjectJsonLd project={project} />}
      {service && <ServiceJsonLd service={service} />}
    </>
  );
};

export default SEO;
