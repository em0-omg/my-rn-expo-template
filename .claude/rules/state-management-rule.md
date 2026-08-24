# State Management Rules (Zustand + TanStack Query)

This project splits state into two layers: Zustand (+ AsyncStorage) for client state, and
TanStack Query for server state fetched from remote APIs.

## Client State vs Server State

Zustand owns **client state**: UI state, user preferences, and data that only exists on the
device. TanStack Query owns **server state**: anything fetched from a remote API.

**Do not copy fetched data into a Zustand store.** Let TanStack Query own the cache, loading
state, and error state, and read it with `useQuery` — a Zustand copy is a second, easily stale
source of truth for the same data.

```tsx
// Bad: server data duplicated into client state
const photos = usePhotosStore((state) => state.photos);
useEffect(() => {
  fetchPhotos().then((data) => usePhotosStore.getState().setPhotos(data));
}, []);

// Good: TanStack Query owns the fetch, cache, and loading/error state
const { data: photos, isPending, isError } = usePhotos();
```

See `src/hooks/use-photos.ts` for the reference implementation and
`.claude/rules/testing-rule.md` for how to test hooks built on `useQuery`.

## Core Principles

1. **Lightweight First**: Keep stores small and focused
2. **Performance**: Use individual selectors to prevent unnecessary re-renders
3. **Persistence**: Use AsyncStorage for data that should survive app restarts
4. **DevTools**: Always wrap stores with `devtools` for debugging

## Store Structure

### Location

All stores are located in `src/stores/`:

```
src/stores/
├── app-store.ts      # App-wide state (initialization, user, loading)
├── counter-store.ts  # Example store with persistence
└── index.ts          # Centralized exports
```

### Naming Conventions

- Store file: `{name}-store.ts` (kebab-case)
- Store hook: `use{Name}Store` (camelCase with "use" prefix)
- Selector hooks: `use{Property}` (e.g., `useCount`, `useIsInitialized`)

## Store Pattern

### Basic Structure

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// 1. State interface (data only)
interface ExampleState {
  value: string;
  count: number;
}

// 2. Actions interface (methods only)
interface ExampleActions {
  setValue: (value: string) => void;
  increment: () => void;
  reset: () => void;
}

// 3. Combined store type
type ExampleStore = ExampleState & ExampleActions;

// 4. Initial state
const initialState: ExampleState = {
  value: '',
  count: 0,
};

// 5. Create store with middleware
export const useExampleStore = create<ExampleStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setValue: (value) => set({ value }, false, 'setValue'),

        increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),

        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'example-storage',
        storage: createJSONStorage(() => AsyncStorage),
        // Only persist what's needed
        partialize: (state) => ({
          value: state.value,
          count: state.count,
        }),
      }
    ),
    { name: 'example-store' }
  )
);

// 6. Selector hooks for performance
export const useValue = () => useExampleStore((state) => state.value);
export const useCount = () => useExampleStore((state) => state.count);
```

## Middleware Usage

### Required Middleware

1. **devtools**: Always use for debugging (wraps outermost)
2. **persist**: Use for data that should survive restarts

### Middleware Order

```typescript
create<Store>()(
  devtools(
    // Outer: enables Redux DevTools
    persist(
      // Inner: handles persistence
      (set) => ({}),
      {/* persist options */}
    ),
    { name: 'store-name' }
  )
);
```

## Selectors

### Individual Selectors (Preferred)

```typescript
// Good: Minimal re-renders
const count = useCounterStore((state) => state.count);
const increment = useCounterStore((state) => state.increment);
```

### Grouped Actions with useShallow

```typescript
import { useShallow } from 'zustand/shallow';

// Good for grouping multiple actions
export const useCounterActions = () =>
  useCounterStore(
    useShallow((state) => ({
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset,
    }))
  );
```

### Avoid

```typescript
// Bad: Causes re-render on any state change
const { count, increment, decrement } = useCounterStore();

// Bad: New object reference every render
const actions = useCounterStore((state) => ({
  increment: state.increment,
  decrement: state.decrement,
}));
```

## Persistence

### partialize

Only persist what's necessary:

```typescript
persist((set) => ({/* ... */}), {
  name: 'app-storage',
  storage: createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({
    // Persist user preferences
    isOnboarded: state.isOnboarded,
    user: state.user,
    // Don't persist runtime state
    // isInitialized: NO
    // globalLoading: NO
  }),
});
```

### Storage Keys

Use descriptive, unique storage keys:

- `app-storage` - Main app state
- `counter-storage` - Counter example
- `{feature}-storage` - Feature-specific state

## Action Naming

### set() Third Parameter

Always provide action name for DevTools:

```typescript
// Good: Named action
set({ count: 1 }, false, 'setCount');
set((state) => ({ count: state.count + 1 }), false, 'increment');

// Bad: Anonymous action
set({ count: 1 });
```

### Action Name Conventions

- Setters: `set{Property}` (e.g., `setUser`, `setCount`)
- Toggles: `toggle{Property}` (e.g., `toggleDarkMode`)
- Increment/Decrement: `increment`, `decrement`, `incrementByAmount`
- Clear/Reset: `clear{Property}`, `reset`, `reset{Feature}`

## State Categories

### Runtime State (Don't Persist)

- `isInitialized` - App initialization status
- `isLoading` - Loading states
- `error` - Error states
- Temporary UI state

### User Preferences (Persist)

- `isOnboarded` - Onboarding completion
- `theme` - User theme preference
- `locale` - User language preference
- Feature settings

### User Data (Persist with Care)

- `user` - User profile info
- Cached data (with TTL consideration)

## Exports

Export from `src/stores/index.ts`:

```typescript
// Store hooks
export { useCounterStore, useCount, useCounterActions } from './counter-store';
export { useAppStore, useIsInitialized, useUser } from './app-store';
```

## Usage in Components

```tsx
import { useCount, useCounterActions } from '@/stores';

function Counter() {
  const count = useCount();
  const { increment, decrement } = useCounterActions();

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onPress={increment}>+</Button>
      <Button onPress={decrement}>-</Button>
    </View>
  );
}
```

## Server State (TanStack Query)

### Query Client

`src/lib/query-client.ts` exports the shared `queryClient` and `subscribeToAppStateFocus()`.
React Query's default focus-based refetch detection is web-only, so `subscribeToAppStateFocus()`
bridges React Native's `AppState` into `focusManager`. Both are wired up once, in the root layout:

```tsx
// src/app/_layout.tsx
useEffect(subscribeToAppStateFocus, []);

return <QueryClientProvider client={queryClient}>{/* ... */}</QueryClientProvider>;
```

### Query Key Factory

Group a resource's keys under one object instead of writing array literals at each call site, so
every consumer (and `queryClient.invalidateQueries`) stays in sync:

```typescript
export const photoKeys = {
  all: ['photos'] as const,
  list: (limit: number) => [...photoKeys.all, 'list', limit] as const,
};
```

### AbortSignal

Pass the `signal` argument `useQuery` gives `queryFn` straight into `fetch`, so an in-flight
request is cancelled when the query key changes or the component unmounts:

```typescript
async function fetchPhotos(limit: number, signal: AbortSignal): Promise<Photo[]> {
  const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${limit}`, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load photos (${response.status})`);
  }
  const data: PicsumPhoto[] = await response.json();
  return data.map((photo) => ({
    id: photo.id,
    author: photo.author,
    downloadUrl: photo.download_url,
  }));
}

export function usePhotos(limit = 20) {
  return useQuery({
    queryKey: photoKeys.list(limit),
    queryFn: ({ signal }) => fetchPhotos(limit, signal),
  });
}
```

Map the raw API payload to an app-facing type inside the fetcher (as above), so components never
see the wire format. See `src/hooks/use-photos.ts` for the full example, and
`src/app/(tabs)/explore.tsx` for consuming it with pull-to-refresh and loading/error/empty states
via `isPending`, `isError`, `refetch`, and `isRefetching`.
