'use client';

import css from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  classes?: string[]; // додаткові класи
}

const Section = ({ children, classes = [] }: SectionProps) => {
  const allClasses = [
    css.section, // обов'язковий клас
    ...classes.map(cl => css[cl] ?? cl), // мапимо модульні класи
  ].filter(Boolean);

  const className = allClasses.join(' ');

  return <section className={className}>{children}</section>;
};

export default Section;
