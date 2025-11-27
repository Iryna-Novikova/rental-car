import type { Car } from './car'; 

export interface CarsHttpResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
}