import axios from 'axios';
import type { CarTypePrice } from '@/types/car';
import type { CarsHttpResponse } from '@/types/api';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

// отримати список автомобілів
export const getAllCars = async (page: number, brand?: string, rentalPrice?:CarTypePrice | '', minMileage?: number | '', maxMileage?: number | '', limit?: number): Promise<CarsHttpResponse> => {
    const endPoint = '/cars';

    const params = {
        page, 
        limit: limit ? limit : 12, 
        brand: brand ? brand : '',
        rentalPrice: rentalPrice ? rentalPrice : '',
        minMileage: minMileage ? minMileage : '',
        maxMileage: maxMileage ? maxMileage : '',
    }

    const response = await axios.get<CarsHttpResponse>(endPoint, { params });
    
    return response.data;
}

//отримати список брендів
export const getAllBrands = async (): Promise<string[]> => {
    const endPoint = '/brands';

    const response = await axios.get<string[]>(endPoint);
    
    return response.data;
}