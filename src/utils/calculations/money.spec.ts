import { getPriceStringFromCents } from './money';

describe('Test getPriceFromCents', () => {
    test('Cents converted to money string', () => {
        expect(getPriceStringFromCents(1500)).toBe('$15.00');
    });
});
