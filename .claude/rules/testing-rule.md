# Testing Rules

This project ships Jest unit and component tests only. Integration and end-to-end suites (Maestro,
Detox, and friends) are deliberately absent — add one when a feature actually needs it, rather than
carrying a harness nothing runs.

## Unit & Component Tests (Jest)

### Stack

- **Preset**: `jest-expo` (configured in `jest.config.js`)
- **Library**: `@testing-library/react-native` v14
- **Run with**: `npm test`

### Location

Tests live in `__tests__/` directories next to the code they cover:

```
src/
├── components/__tests__/themed-text.test.tsx
├── hooks/__tests__/use-photos.test.tsx
├── hooks/__tests__/use-translation.test.tsx
├── lib/__tests__/i18n.test.ts
└── stores/__tests__/counter-store.test.ts
```

### RNTL v14: everything is async

`render`, `renderHook`, `fireEvent`, and `act` all return Promises in v14 and must be `await`ed. A
missing `await` produces an "act" warning, or a test that reads state before it has settled.

```tsx
// Good
await render(<ThemedText>Hello</ThemedText>);
expect(screen.getByText('Hello')).toBeOnTheScreen();

// Bad: render() is not awaited
render(<ThemedText>Hello</ThemedText>);
```

v14 also registers its Jest matchers (`toBeOnTheScreen`, `toHaveStyle`, ...) automatically on
import. **There is no `@testing-library/react-native/extend-expect` import anymore** — it was
removed in v14. Do not add it back; it will fail to resolve.

### AsyncStorage mock

`jest-setup.ts` mocks `@react-native-async-storage/async-storage` with the mock the package ships:

```typescript
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
```

Without it, Zustand's `persist` middleware warns on every store import under Jest, since there is
no native module to back `AsyncStorage`.

### Testing TanStack Query hooks

Build a **per-test** `QueryClient` — never reuse the app's shared `queryClient` from
`src/lib/query-client.ts` — with `retry: false` and `gcTime: 0`:

```tsx
function createWrapper() {
  // retry: false so failure assertions do not wait on backoff.
  // gcTime: 0 so no cache timer outlives the test and keeps Jest alive.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}
```

Clear the client in `afterEach` and mock `global.fetch` per test. See
`src/hooks/__tests__/use-photos.test.tsx` for the full pattern, including asserting both the
success shape and a non-OK response.

## CI & Git Hooks

- `.github/workflows/ci.yml` runs lint, typecheck, `prettier --check .`, and `npm test -- --ci` on
  every pull request to `main` and every push to `main`.
- `lefthook.yml` runs lint + format on `pre-commit` (staged files only, auto-fixed and re-staged)
  and typecheck + test on `pre-push`.
