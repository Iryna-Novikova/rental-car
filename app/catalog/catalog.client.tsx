import CarCard from '@/components/CarCard/CarCard';
import { CarsHttpResponse } from '@/types/api';
import css from './catalog.module.css';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';

interface CatalogPageClientProps {
  initialData: CarsHttpResponse;
}

export default function CatalogPageClient({
  initialData,
}: CatalogPageClientProps) {
  return (
    <Section>
      <Container>
        <ul className={css.carList}>
          {initialData.cars.map(car => (
            <li key={car.id} className={css.carItem}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
