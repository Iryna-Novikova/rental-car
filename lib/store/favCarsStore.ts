import { create } from 'zustand';
import { persist } from "zustand/middleware";

type favCarsStore = {
    favCars: string[];
    setFavCars: (carId: string) => void;
    clearFavCars: () => void;
    clearFromFavCars: (carId: string) => void;
}

export const useFavCarsStore = create<favCarsStore>()(
    persist (
    (set) => ({
    favCars: [],
    setFavCars: (carId) => set((state) => ({
        favCars: [...state.favCars, carId]
    })),
    clearFavCars:  () => set({ favCars: [] }),
    clearFromFavCars: (carId) => set((state) => ({favCars: state.favCars.filter((f) => f !== carId ) })),
    }),
        {
            name: 'favCars',
            partialize: (state) => ({ favCars: state.favCars }),
        }
    ));