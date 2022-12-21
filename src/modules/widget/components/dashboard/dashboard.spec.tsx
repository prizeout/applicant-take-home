import React from 'react';
import { fireEvent, render, screen } from '../../../../testing/test-utils';
import '@testing-library/jest-dom';

import Dashboard from './dashboard';

describe('Dashboard Integration Tests', () => {
    test('Selects gift card and price option', () => {
        render(<Dashboard />);

        // Click Magazines.com gift card tile
        fireEvent.click(screen.getByText('Magazines.com'));

        // Checks that Checkout Panel is open
        screen.getByText('Select Redemption Amount');

        // Clicks on price option
        fireEvent.click(screen.getByText('$24.50'));

        // Checks that price detail shows
        expect(screen.getByTestId('price-detail')).toHaveTextContent('$25.00');
    });
});
