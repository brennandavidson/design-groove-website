export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Design Groove',
    url: 'https://designgroove.io',
    logo: 'https://designgroove.io/logo.png',
    description: 'Design Groove is a web design and marketing agency building high-converting websites and digital systems for service businesses ready to scale.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://designgroove.io/contact',
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/designgroove',
      // 'https://linkedin.com/company/designgroove',
      // 'https://instagram.com/designgroove',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Design Groove',
    url: 'https://designgroove.io',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://designgroove.io/work?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Design Groove',
    url: 'https://designgroove.io',
    description: 'Web design and marketing agency building high-converting websites for service businesses.',
    priceRange: '$$$$',
    serviceType: ['Web Design', 'Digital Marketing', 'Website Development', 'Conversion Optimization'],
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceJsonLd({ service }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'Organization',
      name: 'Design Groove',
      url: 'https://designgroove.io',
    },
    description: service.description,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProjectJsonLd({ project }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    dateCreated: project.year,
    creator: {
      '@type': 'Organization',
      name: 'Design Groove',
      url: 'https://designgroove.io',
    },
    url: `https://designgroove.io/work/${project.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
