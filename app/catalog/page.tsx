// import Section from '@/components/Section/Section';
// import Container from '@/components/Container/Container';
import { getAllBrands, getAllCars } from '@/lib/api';
import CatalogPageClient from './catalog.client';

export default async function CatalogPage() {
  const cars = await getAllCars(1);
  const brands = await getAllBrands();

  return (
    <>
      {/* <Section> */}
      {/* <Container> */}
      <CatalogPageClient carsHttp={cars} brands={brands} />
      {/* </Container> */}
      {/* </Section> */}
    </>
  );
}
