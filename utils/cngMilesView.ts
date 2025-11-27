export function cngMilesView(miles: number): string {
    if (Number.isNaN(miles)) return '';
    const formatMiles = Intl.NumberFormat('uk-UA').format(miles);
    
    return (`${formatMiles}\u00A0km`);
}