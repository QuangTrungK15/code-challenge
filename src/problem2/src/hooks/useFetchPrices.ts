import { useState, useEffect } from 'react';

const PRICES_URL = 'https://interview.switcheo.com/prices.json';

export type PriceItem = { currency: string; date: string; price: number };

/** Dedupe by currency, keep the entry with the latest date per currency */
function dedupeByCurrency(items: PriceItem[]): PriceItem[] {
    const byCurrency = new Map<string, PriceItem>();
    for (const item of items) {
        const existing = byCurrency.get(item.currency);
        if (!existing || new Date(item.date) > new Date(existing.date)) {
            byCurrency.set(item.currency, item);
        }
    }
    return Array.from(byCurrency.values()).sort((a, b) => a.currency.localeCompare(b.currency));
}

export function useFetchPrices() {
    const [dataSet, setDataSet] = useState<PriceItem[]>([]);
    const [isLoadingPrices, setIsLoadingPrices] = useState(true);
    const [pricesError, setPricesError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchPrices() {
            try {
                const res = await fetch(PRICES_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json: PriceItem[] = await res.json();
                if (!cancelled) {
                    setDataSet(dedupeByCurrency(json));
                    setPricesError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setPricesError(err instanceof Error ? err.message : 'Failed to load prices');
                    setDataSet([]);
                }
            } finally {
                if (!cancelled) setIsLoadingPrices(false);
            }
        }
        fetchPrices();
        return () => {
            cancelled = true;
        };
    }, []);

    return {
        dataSet,
        isLoadingPrices,
        pricesError,
    };
}
