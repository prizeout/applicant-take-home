import CarouselWrapperComponent from './carousel-wrapper';
import RouterWrapperComponent from './router-wrapper';
import { PrizeoutOfferValueOptions } from './../../../slices/offers-slice';

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

export interface PurchaseData {
    checkout_value_id: string;
    cost_in_cents: number;
    name: string;
    value_in_cents: number;
    status: string;
}

// with real api, use async/await
export const fetchData = (name: string, giftCard: PrizeoutOfferValueOptions): PurchaseData => {
    const { checkout_value_id, cost_in_cents, value_in_cents } = giftCard;
    const params = {
        checkout_value_id,
        cost_in_cents,
        name,
        value_in_cents,
    };
    // const options = {
    //     body: JSON.stringify(params),
    //     headers: { Accept: 'application/json' },
    //     method: 'POST',
    // };
    // const res = await fetch('api/purchase', options)
    //     .then((response) => response.json())
    //     .then((response) => response)
    //     .catch((err) => console.log(err));

    const status = Math.floor(Math.random() * 10) % 10 != 0 ? '200' : '400';

    return {
        ...params,
        status,
    };
};
