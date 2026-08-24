import { render, screen } from '@testing-library/react-native';

import { ThemedText } from '@/components/themed-text';

describe('ThemedText', () => {
  it('renders its children', async () => {
    await render(<ThemedText>Hello</ThemedText>);

    expect(screen.getByText('Hello')).toBeOnTheScreen();
  });

  it('applies the type preset on top of the theme color', async () => {
    await render(<ThemedText type="title">Title</ThemedText>);

    expect(screen.getByText('Title')).toHaveStyle({ fontSize: 32, fontWeight: 'bold' });
  });

  it('keeps caller styles last so they win', async () => {
    await render(<ThemedText style={{ fontSize: 11 }}>Small</ThemedText>);

    expect(screen.getByText('Small')).toHaveStyle({ fontSize: 11 });
  });
});
