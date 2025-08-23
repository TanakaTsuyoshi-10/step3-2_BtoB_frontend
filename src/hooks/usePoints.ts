import useSWR, { mutate as globalMutate } from 'swr';
import { fetchBalance, fetchHistory, redeem } from '@/lib/api/points';
import { SWR_KEYS } from '@/lib/swr';
import type { PointsBalance, PointsHistory, RedemptionResponse } from '@/types/points';

export function usePoints(userId?: number) {
  const balanceKey = SWR_KEYS.balance(userId);
  const historyKey = SWR_KEYS.history(userId);

  const {
    data: balance,
    error: balanceError,
    isLoading: balanceLoading,
    mutate: mutateBalance
  } = useSWR(balanceKey, () => fetchBalance(userId), {
    revalidateOnFocus: true,
    dedupingInterval: 2000,
  });

  const {
    data: historyData,
    error: historyError,
    isLoading: historyLoading,
    mutate: mutateHistory
  } = useSWR(historyKey, () => fetchHistory(userId, 20), {
    revalidateOnFocus: true,
    dedupingInterval: 2000,
  });

  const redeemWithOptimisticUpdate = async (productId: number): Promise<RedemptionResponse> => {
    if (!balance) {
      throw new Error('Balance not loaded');
    }

    try {
      // Optimistic update
      const optimisticBalance = {
        ...balance,
        current_balance: balance.current_balance,
      };
      
      await mutateBalance(optimisticBalance, false);

      // API call
      const result = await redeem(productId, userId);

      // Update both balance and history
      await mutateBalance();
      await mutateHistory();

      // Trigger KPI refresh for admin dashboard
      globalMutate(SWR_KEYS.kpi);

      return result;
    } catch (error) {
      // Rollback optimistic update
      await mutateBalance();
      throw error;
    }
  };

  return {
    balance,
    history: historyData?.history || [],
    isLoading: balanceLoading || historyLoading,
    error: balanceError || historyError,
    refetchBalance: mutateBalance,
    refetchHistory: mutateHistory,
    redeem: redeemWithOptimisticUpdate,
  };
}