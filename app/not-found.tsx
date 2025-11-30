import { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Not found',
  description: `Such page not found`,
  openGraph: {
    title: 'Rental car',
    description: 'An app for rental car.',
    url: 'http://localhost:3000',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <>
      <Section>
        <Container>
          <div className={css.wrapper}>
            <h2 className={css.title}>404 - Page not found</h2>
            <p className={css.description}>
              {"Sorry, but this page doesn't exist."}
            </p>
            <svg width={60} height={60} className={css.carSvg}>
              <use href="/sprite.svg#icon-car" />
            </svg>
            <Link href="/" className={css.link}>
              Back to Home
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default NotFound;
