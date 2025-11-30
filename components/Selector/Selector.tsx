'use client';

import { CarTypePrice } from '@/types/car';
import css from './Selector.module.css';
import { useState } from 'react';

type SelectValue = CarTypePrice | string;

type CSSVar = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

interface SelectorProps {
  selectorName: string;
  defName: SelectValue;
  labelName: string;
  width: string;
  values: SelectValue[];
}

export function Selector({
  selectorName,
  defName,
  labelName,
  width,
  values,
}: SelectorProps) {
  const [selValue, setSelValue] = useState<SelectValue>(defName);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelValue(e.target.value);
  };

  return (
    <div className={css.selectGroup}>
      <label htmlFor={selectorName} className={css.label}>
        {labelName}
      </label>
      <select
        name={selectorName}
        id={selectorName}
        value={selValue}
        onChange={onChange}
        style={{ '--w': width } as CSSVar}
        className={css.select}
      >
        <option value=""> {`Choose a ${selectorName}`}</option>
        {values.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
