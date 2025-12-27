import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

// State interface
interface CounterState {
  count: number;
}

// Actions interface
interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
  incrementByAmount: (amount: number) => void;
}

// Combined store type
type CounterStore = CounterState & CounterActions;

// Initial state
const initialState: CounterState = {
  count: 0,
};

/**
 * Counter Store - A simple example store demonstrating Zustand usage with persistence
 *
 * Usage:
 * ```tsx
 * import { useCounterStore } from '@/stores/counter-store';
 *
 * function Counter() {
 *   const count = useCounterStore((state) => state.count);
 *   const increment = useCounterStore((state) => state.increment);
 *
 *   return (
 *     <Button onPress={increment}>Count: {count}</Button>
 *   );
 * }
 * ```
 */
export const useCounterStore = create<CounterStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),

        decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),

        reset: () => set(initialState, false, 'reset'),

        setCount: (value) => set({ count: value }, false, 'setCount'),

        incrementByAmount: (amount) =>
          set((state) => ({ count: state.count + amount }), false, 'incrementByAmount'),
      }),
      {
        name: 'counter-storage',
        storage: createJSONStorage(() => AsyncStorage),
        // Only persist state, not actions
        partialize: (state) => ({ count: state.count }),
      }
    ),
    { name: 'counter-store' }
  )
);

// Selector hooks for performance optimization
export const useCount = () => useCounterStore((state) => state.count);
export const useCounterActions = () =>
  useCounterStore(
    useShallow((state) => ({
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset,
      setCount: state.setCount,
      incrementByAmount: state.incrementByAmount,
    }))
  );
