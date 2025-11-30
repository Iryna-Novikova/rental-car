'use client';

import css from './Pagination.module.css';

interface PaginationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

const Pagination = ({
  buttonName,
  type = 'button',
  ...rest
}: PaginationProps) => {
  return (
    <button type={type} className={css.button} {...rest}>
      {buttonName}
    </button>
  );
};

export default Pagination;
