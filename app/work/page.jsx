import WorkCollection from '@/pages/WorkCollection';

export const metadata = {
  title: 'Work',
  description: 'Explore our portfolio of brand identity, web design, and digital projects. See how we help service businesses build revenue systems that convert.',
  openGraph: {
    title: 'Our Work | Design Groove',
    description: 'Explore our portfolio of brand identity, web design, and digital projects.',
    url: 'https://designgroove.io/work',
  },
};

export default function WorkPage() {
  return <WorkCollection />;
}
