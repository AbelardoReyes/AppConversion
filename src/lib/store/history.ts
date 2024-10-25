import { Exchange } from "@/types/exchange.ts";

interface ExchangeHistoryStore {
  [key: string]: Exchange[];
}

const STORAGE_KEY = "exchangeHistoryStore";

// Initialize the store with data from the JSON file
async function initializeStore(): Promise<void> {
  const result = await import("@/lib/jsons/exchange_history.json", {
    assert: { type: "json" }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result.default));
}

// Helper function to get the store from localStorage
function getStore(): ExchangeHistoryStore {
  const storeJson = localStorage.getItem(STORAGE_KEY);
  return storeJson ? JSON.parse(storeJson) : {};
}

// Helper function to save the store to localStorage
function saveStore(store: ExchangeHistoryStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export async function getExchangeHistory(slug: string): Promise<Exchange[]> {
  if (!localStorage.getItem(STORAGE_KEY)) {
    await initializeStore();
  }

  const store = getStore();
  return store[slug] || [];
}

export async function addExchangeToHistory(slug: string, data: Exchange): Promise<void> {
  if (!localStorage.getItem(STORAGE_KEY)) {
    await initializeStore();
  }

  const store = getStore();
  const history = store[slug] || [];
  const newHistory = [...history, data];

  saveStore({
    ...store,
    [slug]: newHistory
  });
}

// Convert a single exchange rate from old base to new base
export function convertExchangeRate(
  exchange: Exchange,
  oldBaseRate: number,
  newBaseRate: number
): Exchange {
  return {
    date: exchange.date,
    // Use more precise division and round to 6 decimal places
    value: Number((exchange.value * oldBaseRate / newBaseRate).toFixed(6))
  };
}

// Helper function to find the rate for a specific date in a currency's history
export function findRateByDate(history: Exchange[], date: string): number {
  const exchange = history.find(e => e.date === date);
  return exchange?.value ?? 1; // Default to 1 if no rate found for that date
}

// Convert an array of exchange rates based on the new base currency's rates
export function convertExchangeHistory(
  history: Exchange[],
  newBaseCurrencyHistory: Exchange[]
): Exchange[] {
  return history.map(exchange => {
    const newBaseRate = findRateByDate(newBaseCurrencyHistory, exchange.date);
    return convertExchangeRate(exchange, 1, newBaseRate);
  });
}


// Update the entire store with new base currency rates
export function convertStore(
  store: ExchangeHistoryStore,
  newBaseCurrency: string
): ExchangeHistoryStore {
  const newBaseCurrencyHistory = store[newBaseCurrency] || [];

  return Object.entries(store).reduce((newStore, [currency, history]) => {
    // Skip converting the new base currency's own history
    if (currency === newBaseCurrency) {
      const normalizedHistory = history.map(exchange => ({
        ...exchange,
        value: 1 // Set all values to 1 since it's now the base currency
      }));
      return { ...newStore, [currency]: normalizedHistory };
    }

    return {
      ...newStore,
      [currency]: convertExchangeHistory(history, newBaseCurrencyHistory)
    };
  }, {});
}

export async function updateStoreBaseCurrency(
  newBaseCurrency: string
): Promise<void> {
  if (!localStorage.getItem(STORAGE_KEY)) {
    await initializeStore();
  }

  const store = getStore();

  // Check if the new base currency exists in the store
  if (!store[newBaseCurrency]) {
    throw new Error(`Currency ${newBaseCurrency} not found in store`);
  }

  // Convert all rates in the store
  const updatedStore = convertStore(store, newBaseCurrency);

  // Save the updated store
  saveStore(updatedStore);
}