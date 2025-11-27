'use client';
import css from './CarCard.module.css';
import { Car, CarAdr } from '@/types/car';
import Image from 'next/image';
import { splitAddress } from '@/utils/splitAddress';
import { cngMilesView } from '@/utils/cngMilesView';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const router = useRouter();

  function handleOnClick() {
    router.push(`/catalog/${car.id}`);
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
        <button className={css.btnFavorite}>
          <svg className={css.svgFavorite} width="16" height="16">
            {/* {isFavourite ? ( */}
            <use href="/svg-sprite.svg#icon-heart-full"></use>
            {/* ) : ( */}
            {/* <use href="/svg-sprite.svg#icon-heart-contur"></use> */}
            {/* )} */}
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
        <li className={css.carPropertiesItem}>{car.type}</li>
        <li className={css.carPropertiesItem}>{carMiles}</li>
      </ul>
      <Button btnOnClick={handleOnClick} buttonName="Read more" />
    </>
  );
}
