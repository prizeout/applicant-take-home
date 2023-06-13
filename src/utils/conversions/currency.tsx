export const convertToUSD = (amount: number): string =>
    amount.toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });
