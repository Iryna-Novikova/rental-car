import { Car, CarTypePrice } from '@/types/car';
import { create } from 'zustand';

type CarsQueryListStore = {
    brandSel: string;
    priceSel: CarTypePrice | '';
    milesFrom: number | '';
    milesTo: number | '';
    cars: Car[];
    setSearchParams: (brand: string, price: CarTypePrice | '', milesFrom: number | '', milesTo: number | '') => void;
    clearSearchParams: () => void;
    setCars: (cars: Car[]) => void;
    clearCars: () => void;
    replaceCars: (newCars: Car[]) => void;
}

export const useCarsQueryListStore = create<CarsQueryListStore>()((set) => ({
    brandSel: '',
    priceSel: '',
    milesFrom: '',
    milesTo: '',
    isNewData: true,
    cars: [],
    setSearchParams: (brand, price, milesFrom, milesTo) =>
        set({ brandSel: brand, priceSel: price, milesFrom, milesTo }),
    clearSearchParams: () => set({ brandSel: '', priceSel: '', milesFrom: '', milesTo: ''}),
    setCars: (newCars: Car[]) => set(state => ({ cars: [...state.cars, ...newCars.filter(car => !state.cars.some(c => c.id === car.id))] })),
    replaceCars: (newCars: Car[]) => set({ cars: newCars }),
    clearCars: () => set({ cars: [] }),
}));