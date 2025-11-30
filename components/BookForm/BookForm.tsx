'use client';

import toast, { Toaster } from 'react-hot-toast';

import css from './BookForm.module.css';
import type { CarBookFormType } from '@/types/car';
// import { useRouter } from 'next/navigation';
import { useBookCarStore } from '@/lib/store/bookCarStore';
import Button from '../Button/Button';

export default function BookForm() {
  // const router = useRouter();

  const { carDraft, setCarDraft, clearCarDraft } = useBookCarStore();

  const handleChange = (
    evnt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCarDraft({
      ...carDraft,
      [evnt.target.name]: evnt.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const bookCar: CarBookFormType = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      bookDate: formData.get('bookDate') as string,
      comment: formData.get('comment') as string,
    };

    const toDay = new Date();
    const bookDate = new Date(bookCar.bookDate);
    if (toDay > bookDate) {
      toast.error('Date must be grater then Today.');
      return;
    }

    toast.success(
      `Hello, ${bookCar.name}! 
       Car is successfully booked
             from ${bookCar.bookDate}. 
       We have sent email to ${bookCar.email} with approve.`
    );
    clearCarDraft();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.description}>
        Stay connected! We are always ready to help you.
      </p>
      {/* name */}
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Name*"
        defaultValue={carDraft?.name}
        onChange={handleChange}
        minLength={3}
        maxLength={50}
        required
        className={css.input}
      />
      {/* <p className={css.error}></p> */}
      {/* email */}
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email*"
        defaultValue={carDraft?.email}
        onChange={handleChange}
        // minLength={3}
        // maxLength={50}
        required
        className={css.input}
      />
      {/* bookDate */}
      <input
        id="bookDate"
        name="bookDate"
        type="date"
        placeholder="Booking date"
        // defaultValue={carDraft?.bookDate}
        onChange={handleChange}
        className={`${css.input} ${css.inputDate}`}
      />
      <textarea
        id="coment"
        name="coment"
        rows={3}
        placeholder="Comment"
        defaultValue={carDraft?.comment}
        onChange={handleChange}
        maxLength={255}
        className={css.textArea}
      />
      <Button type="submit" buttonName="Send" />
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </form>
  );
}
