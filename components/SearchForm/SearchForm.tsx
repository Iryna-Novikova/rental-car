import { CarTypePrice } from '@/types/car';
import { Selector } from '../Selector/Selector';
import css from './SearchForm.module.css';
import Button from '../Button/Button';
import { useCarsQueryListStore } from '@/lib/store/carsQueryListStore';

interface FormProps {
  brands: string[];
  onSubmit: (formData: FormData) => void;
}

export default function SearchForm({ brands, onSubmit }: FormProps) {
  const priceValues: CarTypePrice[] = [20, 30, 40, 50, 60, 70, 80];

  const { milesFrom, milesTo, brandSel, priceSel } = useCarsQueryListStore();

  return (
    <>
      <form className={css.form} action={onSubmit}>
        <div className={css.inputs}>
          <Selector
            selectorName="brand"
            defName={brandSel}
            labelName="Car brand"
            width="204px"
            values={brands}
          />
          <Selector
            selectorName="price"
            defName={priceSel}
            labelName="Price / 1 hour"
            width="196px"
            values={priceValues}
          />
          <div className={css.mileageGroup}>
            <label htmlFor="mileage" className={css.label}>
              Сar mileage / km
            </label>
            <div className={css.mileageGroupInput}>
              <input
                type="number"
                id="mileage"
                name="mileage"
                className={css.inputFrom}
                placeholder="From"
                defaultValue={milesFrom}
              />
              <input
                type="number"
                id="mileageTo"
                name="mileageTo"
                className={css.inputTo}
                placeholder="To"
                defaultValue={milesTo}
              />
            </div>
          </div>
        </div>
        <Button type="submit" buttonName="Search"></Button>
      </form>
    </>
  );
}
