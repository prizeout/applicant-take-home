import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';
import { RootInitialState } from '../../../store';
import { checkoutInitialState } from '../../../slices/checkout-slice';
import { offersInitialState } from '../../../slices/offers-slice';

import PriceDetail from './price-detail';

describe('Test PriceDetail component', () => {
    test('No render when no selectedGiftCard', () => {
        const { container } = render(<PriceDetail />); // Render without selectedGiftCard
        expect(container).toBeEmptyDOMElement();
    });

    test('Displays all relevant price data', () => {
        render(<PriceDetail />, {
            preloadedState: {
                ...RootInitialState,
                checkout: {
                    ...checkoutInitialState,
                    selectedCheckoutValueId: 'c572620e-cd2c-4104-a7db-824bbde94531',
                },
                offers: {
                    ...offersInitialState,
                    activeOffer: {
                        ...offersInitialState.activeOffer,
                        giftcard_list: [
                            {
                                checkout_value_id: 'c572620e-cd2c-4104-a7db-824bbde94531',
                                cost_in_cents: 490,
                                display_bonus: 2.04,
                                value_in_cents: 500,
                            },
                            {
                                checkout_value_id: 'b6e068e5-a086-4864-9b5c-10a95bd726c1',
                                cost_in_cents: 980,
                                display_bonus: 2.04,
                                value_in_cents: 1000,
                            },
                        ],
                    },
                },
            },
        });
        expect(screen.getByText('$4.90')).toBeVisible();
        expect(screen.getByText('$0.10')).toBeVisible();
        expect(screen.getByText('Prizeout Bonus (+2.04%)')).toBeVisible();
        expect(screen.getByText('$5.00')).toBeVisible();
    });
});
