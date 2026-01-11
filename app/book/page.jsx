import BookPage from '@/pages/BookPage';

export const metadata = {
  title: 'Book a Call',
  description: 'Schedule a free intro call with Design Groove. Let\'s discuss your project goals, scope, and timeline.',
  openGraph: {
    title: 'Book a Call | Design Groove',
    description: 'Schedule a free intro call to discuss your project.',
    url: 'https://designgroove.io/book',
  },
};

export default function BookRoute() {
  return <BookPage />;
}
