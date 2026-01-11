import ProcessPage from '@/pages/ProcessPage';

export const metadata = {
  title: 'Our Process',
  description: 'Discover our proven 4-phase process — Strategy, Design, Build, and Launch. See how we take projects from concept to conversion in 4-6 weeks.',
  openGraph: {
    title: 'Our Process | Design Groove',
    description: 'Discover our proven 4-phase process for brand and web design projects.',
    url: 'https://designgroove.io/process',
  },
};

export default function ProcessRoute() {
  return <ProcessPage />;
}
