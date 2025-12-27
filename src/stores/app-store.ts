import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// Loading state for different operations
interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

// User info (example)
interface UserInfo {
  id: string | null;
  name: string | null;
  email: string | null;
}

// App State interface
interface AppState {
  // App lifecycle
  isInitialized: boolean;
  isOnboarded: boolean;

  // Loading states
  globalLoading: LoadingState;

  // User
  user: UserInfo;
}

// App Actions interface
interface AppActions {
  // Initialization
  setInitialized: (value: boolean) => void;
  setOnboarded: (value: boolean) => void;

  // Loading
  setGlobalLoading: (isLoading: boolean, message?: string) => void;

  // User actions
  setUser: (user: Partial<UserInfo>) => void;
  clearUser: () => void;

  // Reset
  resetApp: () => void;
}

// Combined store type
type AppStore = AppState & AppActions;

// Initial state
const initialState: AppState = {
  isInitialized: false,
  isOnboarded: false,
  globalLoading: {
    isLoading: false,
    loadingMessage: undefined,
  },
  user: {
    id: null,
    name: null,
    email: null,
  },
};

/**
 * App Store - Global application state with persistence
 *
 * Persisted fields: isOnboarded, user
 * Non-persisted fields: isInitialized, globalLoading (runtime state)
 *
 * Usage:
 * ```tsx
 * import { useAppStore } from '@/stores/app-store';
 *
 * function App() {
 *   const isInitialized = useAppStore((state) => state.isInitialized);
 *   const setInitialized = useAppStore((state) => state.setInitialized);
 *
 *   useEffect(() => {
 *     // Initialize app...
 *     setInitialized(true);
 *   }, []);
 *
 *   if (!isInitialized) return <SplashScreen />;
 *   return <MainApp />;
 * }
 * ```
 */
export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setInitialized: (value) => set({ isInitialized: value }, false, 'setInitialized'),

        setOnboarded: (value) => set({ isOnboarded: value }, false, 'setOnboarded'),

        setGlobalLoading: (isLoading, message) =>
          set(
            {
              globalLoading: {
                isLoading,
                loadingMessage: message,
              },
            },
            false,
            'setGlobalLoading'
          ),

        setUser: (userData) =>
          set(
            (state) => ({
              user: { ...state.user, ...userData },
            }),
            false,
            'setUser'
          ),

        clearUser: () =>
          set(
            {
              user: initialState.user,
            },
            false,
            'clearUser'
          ),

        resetApp: () => set(initialState, false, 'resetApp'),
      }),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => AsyncStorage),
        // Only persist user preferences, not runtime state
        partialize: (state) => ({
          isOnboarded: state.isOnboarded,
          user: state.user,
        }),
      }
    ),
    { name: 'app-store' }
  )
);

// Selector hooks for performance optimization
export const useIsInitialized = () => useAppStore((state) => state.isInitialized);
export const useIsOnboarded = () => useAppStore((state) => state.isOnboarded);
export const useGlobalLoading = () => useAppStore((state) => state.globalLoading);
export const useUser = () => useAppStore((state) => state.user);
