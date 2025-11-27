export type CarTypePrice = 20 | 30 | 40 | 50 | 60 | 70 | 80;

export interface Car {
    id: string;
    year: number;
    brand: string;
    model: string;
    type: string;
    img: string;
    description: string;
    fuelConsumption: number;
    engineSize: string;
    accessories: string[];
    functionalities: string[];
    rentalPrice: CarTypePrice;
    rentalCompany: string;
    address: string;
    rentalConditions: string[];
    mileage: number;
}

export interface CarAdr {
    adr: string; 
    city: string;
    country: string;
}