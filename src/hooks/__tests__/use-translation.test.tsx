import { act, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { useTranslation } from '@/hooks/use-translation';
import { setLocale } from '@/lib/i18n';

function LocaleProbe() {
  const { t, locale } = useTranslation();
  return (
    <>
      <Text testID="locale">{locale}</Text>
      <Text testID="greeting">{t('home.welcome')}</Text>
    </>
  );
}

describe('useTranslation', () => {
  beforeEach(() => {
    setLocale('en');
  });

  it('exposes the active locale and translates through it', async () => {
    await render(<LocaleProbe />);

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByTestId('greeting').props.children).toBeTruthy();
  });

  // Regression: `i18n.locale` is module state React cannot observe. Before the
  // store was wired through `useSyncExternalStore`, `setLocale` changed the
  // value without re-rendering anything, so the UI kept the old language.
  it('re-renders consumers when the locale changes', async () => {
    await render(<LocaleProbe />);
    const before = screen.getByTestId('greeting').props.children;

    await act(async () => {
      setLocale('ja');
    });

    expect(screen.getByTestId('locale')).toHaveTextContent('ja');
    expect(screen.getByTestId('greeting').props.children).not.toBe(before);
  });
});
