import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import { getAllCars } from '@/lib/api';
import CatalogPageClient from './catalog.client';

export default async function CatalogPage() {
  const res = await getAllCars(12, 1);

  return (
    <Section>
      <Container>
        <CatalogPageClient initialData={res} />
      </Container>
    </Section>
  );
}
