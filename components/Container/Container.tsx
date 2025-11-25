'use client';

import css from '@/components/Container/Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  classes?: string[]; // додаткові класи
}

const Container = ({ children, classes = [] }: ContainerProps) => {
  const allClasses = [
    css.container, // обов'язковий клас
    ...classes.map(cl => css[cl] ?? cl), // мапимо модульні класи
  ].filter(Boolean);

  const className = allClasses.join(' ');

  return <div className={className}> {children} </div>;
};

export default Container;
