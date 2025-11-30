import type { CarBookFormType }  from '@/types/car';
import { create } from 'zustand';
import { persist } from "zustand/middleware";

type CarBookDraftStore = {
    carDraft: CarBookFormType; 
    setCarDraft: (carBook: CarBookFormType) => void;
    clearCarDraft: () => void;
}

const initialCarDraft: CarBookFormType  = {
    name:  '',
    email: '',
    bookDate: '',
    comment: '',
}

export const useBookCarStore = create<CarBookDraftStore>() (
    persist (
        (set) => ({
            carDraft: initialCarDraft,
            setCarDraft: (carBook: CarBookFormType) => set(() => ({ carDraft: carBook })),
            clearCarDraft: () => set(() => ({carDraft: initialCarDraft})),
        }),
        {
            name: 'bookCar-draft', 
            partialize: (state) => ({carDraft: state.carDraft})
        }
    ))
