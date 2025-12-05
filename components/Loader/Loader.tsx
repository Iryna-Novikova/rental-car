import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Image from 'next/image';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <Section>
      <Container>
        {/* Loading... */}
        <Image
          src="/favicon.png"
          alt="Loading..."
          width={100}
          height={100}
          // decoding="async"
          // loading="lazy"
          className={css.carLoader}
        />
      </Container>
    </Section>
  );
}
