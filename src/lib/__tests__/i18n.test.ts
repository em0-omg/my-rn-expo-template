import { getLocale, resolveLocale, setLocale, subscribeToLocale } from '@/lib/i18n';

describe('resolveLocale', () => {
  it('keeps locales the app ships translations for', () => {
    expect(resolveLocale('en')).toBe('en');
    expect(resolveLocale('ja')).toBe('ja');
  });

  it('falls back to en for anything else', () => {
    expect(resolveLocale('fr')).toBe('en');
    expect(resolveLocale(null)).toBe('en');
    expect(resolveLocale(undefined)).toBe('en');
  });
});

describe('setLocale', () => {
  beforeEach(() => {
    setLocale('en');
  });

  it('notifies subscribers so React can re-render', () => {
    const listener = jest.fn();
    const unsubscribe = subscribeToLocale(listener);

    setLocale('ja');

    expect(getLocale()).toBe('ja');
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  it('stays quiet when the locale does not actually change', () => {
    setLocale('ja');
    const listener = jest.fn();
    const unsubscribe = subscribeToLocale(listener);

    setLocale('ja');

    expect(listener).not.toHaveBeenCalled();
    unsubscribe();
  });

  it('stops notifying after unsubscribe', () => {
    const listener = jest.fn();
    const unsubscribe = subscribeToLocale(listener);

    unsubscribe();
    setLocale('ja');

    expect(listener).not.toHaveBeenCalled();
  });
});
