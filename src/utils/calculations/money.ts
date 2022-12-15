export const getPriceStringFromCents = (costInCents: number): string => {
    if (!costInCents) {
        return '';
    }
    return `$${(costInCents / 100).toFixed(2)}`;
};
