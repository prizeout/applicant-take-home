export const convertToUSD = (amount:number) => (amount).toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
});