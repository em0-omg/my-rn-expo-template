import { QueryClient, focusManager } from '@tanstack/react-query';
import { AppState, Platform, type AppStateStatus } from 'react-native';

/**
 * Shared server-state cache. Client state belongs in a Zustand store instead —
 * see `.claude/rules/state-management-rule.md`.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      // Mobile networks fail transiently; one retry is usually enough and
      // keeps failures visible instead of hiding them behind long backoffs.
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

/**
 * React Query's default focus detection is web-only, so bridge React Native's
 * AppState into it. Call once from the root layout; returns an unsubscribe.
 */
export function subscribeToAppStateFocus() {
  const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  });

  return () => subscription.remove();
}
