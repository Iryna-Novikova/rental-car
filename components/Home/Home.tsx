'use client';

import css from './Home.module.css';
import { useRouter } from 'next/navigation';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Button from '@/components/Button/Button';
import { useCarsQueryListStore } from '@/lib/store/carsQueryListStore';

export default function Home() {
  const router = useRouter();

  const clearCars = useCarsQueryListStore(state => state.clearCars);
  const clearSearchParams = useCarsQueryListStore(
    state => state.clearSearchParams
  );

  function handleOnClick() {
    clearSearchParams();
    clearCars();
    router.push('/catalog');
  }

  return (
    <Section classes={['hero']}>
      <Container classes={['hero']}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Button
          type="button"
          onClick={handleOnClick}
          buttonName="View Catalog"
        ></Button>
      </Container>
    </Section>
  );
}
