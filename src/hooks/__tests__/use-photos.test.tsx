import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { photoThumbnail, usePhotos } from '@/hooks/use-photos';

let queryClient: QueryClient;

function createWrapper() {
  // retry: false so failure assertions do not wait on backoff.
  // gcTime: 0 so no cache timer outlives the test and keeps Jest alive.
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

const fetchMock = jest.fn();

beforeEach(() => {
  fetchMock.mockReset();
  global.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  queryClient?.clear();
});

describe('usePhotos', () => {
  it('maps the API payload to the app-facing shape', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [
        { id: '0', author: 'Ada Lovelace', download_url: 'https://example/0.jpg' },
      ],
    });

    const { result } = await renderHook(() => usePhotos(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([
      { id: '0', author: 'Ada Lovelace', downloadUrl: 'https://example/0.jpg' },
    ]);
  });

  it('surfaces a non-OK response as an error', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 503, json: async () => [] });

    const { result } = await renderHook(() => usePhotos(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error('Failed to load photos (503)'));
  });
});

describe('photoThumbnail', () => {
  it('requests a list-sized image instead of the full-resolution original', () => {
    const url = photoThumbnail({ id: '42', author: 'x', downloadUrl: 'https://example/big.jpg' });

    expect(url).toBe('https://picsum.photos/id/42/400/300');
  });
});
