// Base components
export { Button } from './base/Button';
export type { ButtonProps } from './base/Button';

// Platform-specific component wrappers
export { AdminButton } from './platform/AdminButton';
export { MobileButton } from './platform/MobileButton';

// Re-export existing components from apps to maintain compatibility
// These will be gradually migrated to shared components