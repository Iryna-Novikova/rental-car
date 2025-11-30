'use client';

import CarCard from '@/components/CarCard/CarCard';
import { CarsHttpResponse } from '@/types/api';
import css from './catalog.module.css';
import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import SearchForm from '@/components/SearchForm/SearchForm';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { getAllCars } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loading from '../loading';
import { useCarsQueryListStore } from '@/lib/store/carsQueryListStore';
import { CarTypePrice } from '@/types/car';

interface CatalogPageClientProps {
  carsHttp: CarsHttpResponse;
  brands: string[];
}

export default function CatalogPageClient({
  carsHttp,
  brands,
}: CatalogPageClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { brandSel, priceSel, milesFrom, milesTo, cars } =
    useCarsQueryListStore();
  const setCars = useCarsQueryListStore(state => state.setCars);
  const replaceCars = useCarsQueryListStore(state => state.replaceCars);
  const clearCars = useCarsQueryListStore(state => state.clearCars);
  const setSearchParams = useCarsQueryListStore(state => state.setSearchParams);

  function handleSubmit(formData: FormData) {
    const brand = formData.get('brand') as string;
    const price = formData.get('price') as CarTypePrice | '';
    const milesFrom = formData.get('mileage') as number | '';
    const milesTo = formData.get('mileageTo') as number | '';
    clearCars();
    setCurrentPage(1);
    setSearchParams(brand, price, milesFrom, milesTo);
  }

  // Запит
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['cars', currentPage, brandSel, priceSel, milesFrom, milesTo],
    queryFn: () =>
      getAllCars(currentPage, brandSel, priceSel, milesFrom, milesTo),
    placeholderData: currentPage === 1 ? undefined : keepPreviousData,
    initialData: currentPage === 1 ? carsHttp : undefined,
  });

  // зберігаємо знайдені машини в store
  useEffect(() => {
    const setCarsSelected = () => {
      if (!data) {
        clearCars();
        return;
      }
      if (currentPage === 1) {
        replaceCars(data.cars);
      } else {
        setCars(data.cars);
      }
      return;
    };

    setCarsSelected();
  }, [data, setCars, replaceCars, clearCars, currentPage]);

  function loadMore() {
    setCurrentPage(currentPage => currentPage + 1);
  }

  return (
    <Section>
      <Container>
        <SearchForm brands={brands} onSubmit={handleSubmit} />
        {/* показуємо лоудер при завантаженні */}
        {isLoading && <Loading />}
        {/* якщо виникла якась помилка */}
        {isError && <div className={css.message}>Error. Try again.</div>}
        {/* Якщо запит успішний але дані не знайдено */}
        {isSuccess && data.cars.length === 0 && (
          <div className={css.message}>
            Cars not found. Please try to put other filters.
          </div>
        )}
        {/* відображаємо знайдені дані */}
        {isSuccess && cars.length > 0 && (
          <ul className={css.carList}>
            {cars.map(car => (
              <li key={car.id} className={css.carItem}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>
        )}
        {/* відображаємо "Load More", якщо ще не остання сторінка */}
        {isSuccess && currentPage < data.totalPages && (
          <Pagination buttonName={'Load more'} onClick={loadMore} />
        )}
      </Container>
    </Section>
  );
}
