/**
 * Exchange rate: each currency has a price in a common base (e.g. USD).
 * Rate from A → B = price_A / price_B
 * So: outputAmount = inputAmount * (price_from / price_to)
 */

export function getExchangeRate(priceFrom: number, priceTo: number): number {
    if (priceTo === 0) return 0;
    return priceFrom / priceTo;
}

export function computeOutputAmount(inputAmount: number, priceFrom: number, priceTo: number): number {
    if (Number.isNaN(inputAmount) || inputAmount < 0) return 0;
    const rate = getExchangeRate(priceFrom, priceTo);
    const result = inputAmount * rate;
    return result > 0 ? Number(result.toFixed(2)) : 0;
}