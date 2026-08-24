// @testing-library/react-native v14 registers its own matchers on import,
// so `toBeOnTheScreen` and friends need no extra setup here.

// AsyncStorage has no native module under Jest, so Zustand's `persist`
// middleware would warn on every store import without this mock.
// `jest.mock` factories are hoisted above imports, so the mock has to be
// pulled in with `require` — this is the form the package documents.
jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
