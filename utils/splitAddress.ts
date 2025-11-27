import type { CarAdr } from "@/types/car";

export function splitAddress(adr: string): CarAdr {
    // вважаємо, що адреса визначеної структури
    const adrArray = adr.split(',').map(adr => adr.trim());
    return {
        adr: adrArray[0] ? adrArray[0] : '', 
        city: adrArray[1] ? adrArray[1] : '',
        country: adrArray[2] ? adrArray[2] : '',
    }
}