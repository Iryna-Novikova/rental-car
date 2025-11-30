'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import css from './CarDetail.module.css';
import { getCarByID } from '@/lib/api';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Image from 'next/image';
import Loading from '@/app/loading';
import BookForm from '@/components/BookForm/BookForm';
import { CarAdr } from '@/types/car';
import { splitAddress } from '@/utils/splitAddress';
import { cngMilesView } from '@/utils/cngMilesView';

export default function CarDetailClient() {
  const { id } = useParams<{ id: string }>();
  let carAdr: CarAdr = {
    adr: '',
    city: '',
    country: '',
  };

  // запит отримання інформації по машині за ID
  const {
    data: car,
    isLoading,
    // isError,
    isSuccess,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarByID(id),
    refetchOnMount: false,
  });

  carAdr = car ? splitAddress(car.address) : carAdr;
  const carMiles = car ? cngMilesView(car.mileage) : '';

  return (
    <Section>
      <Container>
        {isLoading && <Loading />}
        {isSuccess && (
          <div className={css.detailAllWrapper}>
            <div className={css.formImgWrapper}>
              <Image
                src={car.img}
                alt={car.brand + ' ' + car.model}
                width={640}
                height={512}
                decoding="async"
                loading="lazy"
                className={css.carImg}
              />
              <BookForm />
            </div>
            <div className={css.carDetailWrapper}>
              <div className={css.headWrapper}>
                <h2
                  className={css.title}
                >{`${car.brand} ${car.model}, ${car.year}`}</h2>
                <p className={css.idInfo}>id: </p>
              </div>
              <div className={css.adrWrapper}>
                <Link
                  href={`https://www.google.com/maps/place/${carAdr.city}+City,+${carAdr.country}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css.adrLink}
                >
                  <svg width={16} height={16} className={css.svgLocation}>
                    <use href="/sprite.svg#icon-location"></use>
                  </svg>
                  {` ${carAdr.city}, ${carAdr.country}`}
                </Link>
                <p className={css.miles}>{`Mileage: ${carMiles}`}</p>
              </div>
              <p className={css.price}>&#36;{`${car.rentalPrice}`}</p>
              <p className={css.description}>{car.description}</p>
              <ul className={css.propList}>
                {/* Rental Conditions */}
                <li className={css.propListItem}>
                  <h3 className={css.propHeader}>Rental Conditions:</h3>
                  <ul className={css.propListGroup}>
                    {car.rentalConditions.map(cond => (
                      <li key={`rc-${cond}`} className={css.propListGroupItem}>
                        <svg width={16} height={16}>
                          <use href="/sprite.svg#icon-check-circle"></use>
                        </svg>
                        <p>{`${cond}`}</p>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* Car Specifications */}
                <li className={css.propListItem}>
                  <h3 className={css.propHeader}>Car Specifications:</h3>
                  <ul className={css.propListGroup}>
                    <li key={`cs-year`} className={css.propListGroupItem}>
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-calendar"></use>
                      </svg>
                      <p> {`Year: ${car.year}`}</p>
                    </li>
                    <li key={`cs-type`} className={css.propListGroupItem}>
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-car"></use>
                      </svg>
                      <p>{`Type: ${car.type}`}</p>
                    </li>
                    <li
                      key={`cs-fuelConsumption`}
                      className={css.propListGroupItem}
                    >
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-fuel-pump"></use>
                      </svg>
                      <p>{`Fuel Consumption: ${car.fuelConsumption}`}</p>
                    </li>
                    <li key={`cs-engine`} className={css.propListGroupItem}>
                      <svg width={16} height={16}>
                        <use href="/sprite.svg#icon-gear"></use>
                      </svg>
                      <p>{`Engine Size: ${car.engineSize}`}</p>
                    </li>
                  </ul>
                </li>
                {/* Accessories and functionalities:*/}
                <li className={css.propListItem}>
                  <h3 className={css.propHeader}>
                    Accessories and functionalities:
                  </h3>
                  <ul className={css.propListGroup}>
                    {car.accessories.map(cond => (
                      <li key={`la-${cond}`} className={css.propListGroupItem}>
                        <svg width={16} height={16}>
                          <use href="/sprite.svg#icon-check-circle"></use>
                        </svg>
                        <p>{`${cond}`}</p>
                      </li>
                    ))}
                    {car.functionalities.map(cond => (
                      <li key={`lf-${cond}`} className={css.propListGroupItem}>
                        <svg width={16} height={16}>
                          <use href="/sprite.svg#icon-check-circle"></use>
                        </svg>
                        <p>{`${cond}`}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
