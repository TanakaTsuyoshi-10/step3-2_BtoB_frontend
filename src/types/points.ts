export interface PointsBalance {
  user_id: number;
  current_balance: number;
  last_updated: string;
}

export interface PointsHistory {
  id: number;
  user_id: number;
  delta: number;
  reason: string;
  balance_after: number;
  created_at: string;
  type: 'earn' | 'spend';
}

export interface RedemptionResponse {
  success: boolean;
  new_balance: number;
  message?: string;
}