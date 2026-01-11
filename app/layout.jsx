import './globals.css';
import AppWrapper from '@/components/AppWrapper';
import { OrganizationJsonLd, WebsiteJsonLd, LocalBusinessJsonLd } from '@/components/JsonLd';

const siteUrl = 'https://designgroove.io';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Design Groove | Web Design & Marketing Agency',
    template: '%s | Design Groove',
  },
  description: 'Design Groove is a web design and marketing agency building high-converting websites and digital systems for service businesses ready to scale.',
  keywords: ['web design agency', 'marketing agency', 'website design', 'digital marketing', 'conversion optimization', 'service business website', 'B2B web design'],
  authors: [{ name: 'Design Groove' }],
  creator: 'Design Groove',
  publisher: 'Design Groove',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Design Groove',
    title: 'Design Groove | Web Design & Marketing Agency',
    description: 'Design Groove is a web design and marketing agency building high-converting websites and digital systems for service businesses ready to scale.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Design Groove - Web Design & Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Groove | Web Design & Marketing Agency',
    description: 'Design Groove is a web design and marketing agency building high-converting websites and digital systems for service businesses ready to scale.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
