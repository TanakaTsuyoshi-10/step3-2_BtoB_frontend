export const swrConfig = {
  revalidateOnFocus: true,
  dedupingInterval: 2000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

export const SWR_KEYS = {
  products: '/products',
  points: (userId?: number) => userId ? `/points/${userId}` : '/points',
  balance: (userId?: number) => userId ? `/balance/${userId}` : '/balance',
  history: (userId?: number) => userId ? `/history/${userId}` : '/history',
  kpi: '/kpi',
  monthlyUsage: 'metrics/monthly-usage',
  co2Trend: 'metrics/co2-trend',
} as const;