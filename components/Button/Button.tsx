'use client';

import css from './Button.module.css';

interface ButtonProps {
  buttonName: string;
  btnOnClick: () => void;
}

const Button = ({ buttonName, btnOnClick }: ButtonProps) => {
  return (
    <button onClick={btnOnClick} className={css.button}>
      {buttonName}
    </button>
  );
};

export default Button;
