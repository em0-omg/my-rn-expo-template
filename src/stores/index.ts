/**
 * Zustand Stores - Centralized exports
 *
 * Usage:
 * ```tsx
 * import { useCounterStore, useAppStore } from '@/stores';
 * ```
 */

// Counter Store
export { useCounterStore, useCount, useCounterActions } from './counter-store';

// App Store
export {
  useAppStore,
  useIsInitialized,
  useIsOnboarded,
  useGlobalLoading,
  useUser,
} from './app-store';
