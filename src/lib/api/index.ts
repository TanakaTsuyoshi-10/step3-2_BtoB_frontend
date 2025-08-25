// Re-export all API modules for centralized access
export * from './client';
export * from './points';
export * from './metrics';
export * from './products';
export * from './reports';
export * from './incentives';
export * from './mobile';

// For compatibility with mobile app imports
export { getProducts, redeemProduct, getPointsBalance, getPointsHistory } from './mobile';