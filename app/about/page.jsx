import AboutPage from '@/pages/AboutPage';

export const metadata = {
  title: 'About',
  description: 'Learn about Design Groove — a brand and web design studio building revenue systems for service businesses. One point of contact from strategy through launch.',
  openGraph: {
    title: 'About | Design Groove',
    description: 'A brand and web design studio building revenue systems for service businesses.',
    url: 'https://designgroove.io/about',
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
