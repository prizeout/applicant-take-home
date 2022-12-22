// assumption: valueInCents will be a whole number.
// If not, would need to talk to business about how partial-cent costs are resolved
// anything more complicated should use a formatting library
export function formatCurrencyUSD(valueInCents: number): string {
    const dollars = Math.floor(valueInCents / 100);
    const cents = valueInCents % 100;
    return `$${dollars}.${cents < 10 ? `0${cents}` : cents}`;
}
