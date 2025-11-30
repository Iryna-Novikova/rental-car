import { getAllBrands, getAllCars } from '@/lib/api';
import CatalogPageClient from './talog.client';

export default async function CatalogPage() {
  const cars = await getAllCars(1);
  const brands = await getAllBrands();

  return <CatalogPageClient carsHttp={cars} brands={brands} />;
}
