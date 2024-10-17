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