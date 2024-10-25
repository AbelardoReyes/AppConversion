import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Exchange } from "@/types/exchange";
import {
  convertExchangeRate,
  convertExchangeHistory,
  convertStore,
  updateStoreBaseCurrency
} from './history';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => store[key]),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    }
  };
})();

// Mock window.localStorage
vi.stubGlobal('localStorage', localStorageMock);

describe('Exchange Store Functions', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('convertExchangeRate', () => {
    it('should correctly convert a single exchange rate', () => {
      const exchange: Exchange = {
        date: '2024-01-01',
        value: 1.5
      };

      const result = convertExchangeRate(exchange, 1, 20); // Converting to MXN

      expect(result).toEqual({
        date: '2024-01-01',
        value: 0.075 // 1.5 * 1 / 20
      });
    });
  });

  describe('convertExchangeHistory', () => {
    it('should convert rates based on matching dates', () => {
      const history: Exchange[] = [
        { date: '2024-01-01', value: 1.5 },
        { date: '2024-01-02', value: 1.6 }
      ];

      const newBaseCurrencyHistory: Exchange[] = [
        { date: '2024-01-01', value: 20 },
        { date: '2024-01-02', value: 20.5 }
      ];

      const result = convertExchangeHistory(history, newBaseCurrencyHistory);

      expect(result).toEqual([
        { date: '2024-01-01', value: 0.075 }, // 1.5 / 20
        { date: '2024-01-02', value: 0.078049 } // 1.6 / 20.5
      ]);
    });

    it('should use default rate of 1 for missing dates', () => {
      const history: Exchange[] = [
        { date: '2024-01-01', value: 1.5 },
        { date: '2024-01-03', value: 1.7 } // Date not in base currency history
      ];

      const newBaseCurrencyHistory: Exchange[] = [
        { date: '2024-01-01', value: 20 }
      ];

      const result = convertExchangeHistory(history, newBaseCurrencyHistory);

      expect(result[1].value).toBe(1.7); // Uses default rate of 1
    });
  });

  describe('convertStore', () => {
    it('should convert all currencies to new base', () => {
      const store = {
        'USD': [
          { date: '2024-01-01', value: 1 },
          { date: '2024-01-02', value: 1 }
        ],
        'MXN': [
          { date: '2024-01-01', value: 20 },
          { date: '2024-01-02', value: 20.5 }
        ],
        'EUR': [
          { date: '2024-01-01', value: 1.2 },
          { date: '2024-01-02', value: 1.21 }
        ]
      };

      const result = convertStore(store, 'MXN');

      // MXN should now be 1
      expect(result.MXN).toEqual([
        { date: '2024-01-01', value: 1 },
        { date: '2024-01-02', value: 1 }
      ]);

      // USD should be converted using MXN rates
      expect(result.USD[0].value).toBeCloseTo(0.05, 6); // 1 / 20
      expect(result.USD[1].value).toBeCloseTo(0.048780, 6); // 1 / 20.5
    });
  });

  describe('updateStoreBaseCurrency', () => {
    const STORAGE_KEY = 'exchangeHistoryStore';

    it('should throw error if new base currency not found', async () => {
      const initialStore = {
        'USD': [{ date: '2024-01-01', value: 1 }]
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(initialStore));

      await expect(updateStoreBaseCurrency('MXN'))
        .rejects
        .toThrow('Currency MXN not found in store');
    });

    it('should throw error if new base currency not found', async () => {
      const initialStore = {
        'USD': [{ date: '2024-01-01', value: 1 }]
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(initialStore));

      await expect(updateStoreBaseCurrency('MXN'))
        .rejects
        .toThrow('Currency MXN not found in store');
    });

    it('should successfully update store with new base currency', async () => {
      const initialStore = {
        'USD': [
          { date: '2024-01-01', value: 1 }
        ],
        'MXN': [
          { date: '2024-01-01', value: 20 }
        ]
      };
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(initialStore));

      await updateStoreBaseCurrency('MXN');

      // Get the final state from localStorage instead of looking at the mock calls
      const savedStore = JSON.parse(localStorageMock.getItem(STORAGE_KEY));
      expect(savedStore.MXN[0].value).toBe(1);
      expect(savedStore.USD[0].value).toBeCloseTo(0.05, 6);
    });
  });
});