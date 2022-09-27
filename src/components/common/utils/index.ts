import CarouselWrapperComponent from './carousel-wrapper';
import RouterWrapperComponent from './router-wrapper';

export const RouterWrapper = RouterWrapperComponent;
export const CarouselWrapper = CarouselWrapperComponent;

export const currencyFormatter = (currency: string, value: number): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        currency,
        style: 'currency',
    });

    // value is sent as cents
    return formatter.format(value / 100);
};
