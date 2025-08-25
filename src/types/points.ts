export type PointsBalance = { current_balance: number; user_id?: string|number; last_updated?: string; };
export type RedemptionResponse = { new_balance: number; [k: string]: unknown };