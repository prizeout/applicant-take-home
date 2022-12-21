import { render, screen } from '../../../testing/test-utils';
import React from 'react';
import '@testing-library/jest-dom';

import PriceDetail from './price-detail';

const rootState = {
    checkout: {
        selectedCheckoutValueId: 'c572620e-cd2c-4104-a7db-824bbde94531',
    },
    offers: {
        activeOffer: {
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
                {
                    checkout_value_id: '130842d0-5d17-44ce-81c0-a031112b7562',
                    cost_in_cents: 2450,
                    display_bonus: 2.04,
                    value_in_cents: 2500,
                },
                {
                    checkout_value_id: 'bafced0a-fea4-4167-a5f7-b4d7ad25bf14',
                    cost_in_cents: 4900,
                    display_bonus: 2.04,
                    value_in_cents: 5000,
                },
                {
                    checkout_value_id: 'a3fa3587-8d94-417c-8f0f-da5e2f61cb76',
                    cost_in_cents: 49000,
                    display_bonus: 2.04,
                    value_in_cents: 50000,
                },
            ],
        },
    },
};

describe('Test PriceDetail component', () => {
    test('No render when no selectedGiftCard', () => {
        const { container } = render(<PriceDetail />); // Render without selectedGiftCard
        expect(container).toBeEmptyDOMElement();
    });

    test('Displays all data from store', () => {
        render(<PriceDetail />, { preloadedState: rootState });
        expect(screen.getByText('$4.90')).toBeVisible();
        expect(screen.getByText('$0.10')).toBeVisible();
        expect(screen.getByText('Prizeout Bonus (+2.04%)')).toBeVisible();
        expect(screen.getByText('$5.00')).toBeVisible();
    });
});
