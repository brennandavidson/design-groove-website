import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { OrganizationJsonLd, WebsiteJsonLd, LocalBusinessJsonLd, BreadcrumbJsonLd, ProjectJsonLd, ServiceJsonLd } from './JsonLd';

const SEO = ({
  title,
  description,
  keywords,
  image = 'https://designgroove.io/og-image.jpg',
  type = 'website',
  article = false,
  breadcrumb = [],
  project = null,
  service = null,
  noindex = false
}) => {
  const location = useLocation();
  const siteUrl = 'https://designgroove.io';
  const url = `${siteUrl}${location.pathname}`;
  const siteName = 'Design Groove';
  const defaultDescription = 'Design Groove is a premium web design and digital marketing agency. We build high-converting websites, brands, and revenue systems for service businesses ready to scale.';
  const defaultKeywords = 'web design agency, digital marketing, website development, brand design, conversion optimization, service business marketing, lead generation, business automation';
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaTitle = title ? `${title} | ${siteName}` : `${siteName} | Web Design & Digital Marketing Agency`;

  return (
    <>
      <Helmet>
        {/* Standard Metadata */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content="Design Groove" />
        <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
        <link rel="canonical" href={url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${siteName} - ${title || 'Web Design & Digital Marketing'}`} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={`${siteName} - ${title || 'Web Design & Digital Marketing'}`} />

        {/* Article Specific */}
        {article && <meta property="article:author" content="Design Groove" />}
        {article && <meta property="article:publisher" content="https://designgroove.io" />}
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
