import React from 'react';
import { fireEvent, render, screen } from '../../../testing/test-utils';
import '@testing-library/jest-dom';

import PriceOptionButton from './price-option-button';

describe('Test Price Option Button', () => {
    const priceText = '$15.00';

    test('Button is highlighted when selected', () => {
        render(<PriceOptionButton isSelected={true} priceText={priceText} />);

        expect(screen.getByTestId('button')).toHaveClass('priceOptionButton--isSelected');
    });

    test('Button has text', () => {
        render(<PriceOptionButton isSelected={true} priceText={priceText} />);

        expect(screen.getByText(priceText)).toBeVisible();
    });

    test('Button click', () => {
        const onClick = jest.fn();
        render(<PriceOptionButton isSelected={true} onClick={onClick} priceText={priceText} />);

        fireEvent.click(screen.getByText(priceText));
        expect(onClick).toBeCalled();
    });
});
