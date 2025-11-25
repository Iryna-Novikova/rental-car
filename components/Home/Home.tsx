'use client';

import css from './Home.module.css';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Button from '@/components/Button/Button';

export default function Home() {
  const router = useRouter();

  function handleOnClick() {
    router.push('/catalog');
  }

  return (
    <Section classes={['hero']}>
      <Container classes={['hero']}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Button btnOnClick={handleOnClick} buttonName="View Catalog"></Button>
      </Container>
    </Section>
  );
}
