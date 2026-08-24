import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

// Static rendering has no color scheme, so the first client render has to match
// the server output ('light') and only then switch to the real value.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 * Normalized to `'light' | 'dark'` to match the native implementation.
 */
export function useColorScheme(): 'light' | 'dark' {
  const hasHydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const colorScheme = useRNColorScheme();

  if (!hasHydrated) {
    return 'light';
  }

  return colorScheme === 'dark' ? 'dark' : 'light';
}
