'use client';
import css from './CarCard.module.css';
import { Car, CarAdr } from '@/types/car';
import Image from 'next/image';
import { splitAddress } from '@/utils/splitAddress';
import { cngMilesView } from '@/utils/cngMilesView';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { useFavCarsStore } from '@/lib/store/favCarsStore';
import { useEffect, useState } from 'react';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const router = useRouter();

  const { favCars, setFavCars, clearFromFavCars } = useFavCarsStore();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const updateStates = () => {
      if (!favCars) return;
      setIsFavorite(favCars.includes(car.id));
    };
    updateStates();
  }, [favCars, car.id]);

  function handleOnClick() {
    router.push(`/catalog/${car.id}`);
  }

  function toggleFav() {
    if (isFavorite) {
      clearFromFavCars(car.id);
      return;
    }
    setFavCars(car.id);
    return;
  }

  const carAdr: CarAdr = splitAddress(car.address);
  const carMiles = cngMilesView(car.mileage);

  return (
    <>
      <div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={car.brand + ' ' + car.model}
          width={276}
          height={268}
          decoding="async"
          loading="lazy"
          className={css.carImg}
        />
        <button className={css.btnFavorite} onClick={toggleFav}>
          <svg
            className={
              isFavorite
                ? `${css.svgFavorite} ${css.isFav}`
                : `${css.svgFavorite}`
            }
            width="16"
            height="16"
          >
            {isFavorite ? (
              <use href="/sprite.svg#icon-heart-full"></use>
            ) : (
              <use href="/sprite.svg#icon-heart-contur"></use>
            )}
          </svg>
        </button>
      </div>
      <div className={css.brandModelBlock}>
        <p className={css.carDescription}>
          {car.brand + ' '}
          <span className={css.carModel}>{car.model + ', '}</span>
          {car.year}
        </p>
        <p className={css.price}>&#36;{`${car.rentalPrice}`}</p>
      </div>
      <ul className={css.carPropertiesList}>
        <li className={css.carPropertiesItem}>{carAdr.city}</li>
        <li className={css.carPropertiesItem}>{carAdr.country}</li>
        <li className={css.carPropertiesItem}>{car.rentalCompany}</li>
        {/*щоб примусово перенести 4ту колонку на 2й рядок: */}
        <li className={css.carPropertiesBreak}></li>
        <li className={css.carPropertiesItem}>{car.type}</li>
        <li className={css.carPropertiesItem}>{carMiles}</li>
      </ul>
      <Button onClick={handleOnClick} buttonName="Read more" />
    </>
  );
}
