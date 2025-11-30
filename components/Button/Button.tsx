'use client';

import css from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

const Button = ({ buttonName, type = 'button', ...rest }: ButtonProps) => {
  return (
    <button type={type} className={css.button} {...rest}>
      {buttonName}
    </button>
  );
};

export default Button;
