import ContactPage from '@/pages/ContactPage';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Design Groove. Tell us about your project and we\'ll respond within 24 hours.',
  openGraph: {
    title: 'Contact | Design Groove',
    description: 'Get in touch with Design Groove. Tell us about your project.',
    url: 'https://designgroove.io/contact',
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
