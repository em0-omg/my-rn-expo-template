import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * React Native's own `useColorScheme` widened to `'light' | 'dark' | 'unspecified' | null`,
 * none of which the design system defines colors for. Normalize here so every consumer
 * can index `Colors` directly.
 */
export function useColorScheme(): 'light' | 'dark' {
  return useRNColorScheme() === 'dark' ? 'dark' : 'light';
}
