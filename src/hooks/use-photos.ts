import { useQuery } from '@tanstack/react-query';

export type Photo = {
  id: string;
  author: string;
  /** Full-resolution source; request a smaller size for list thumbnails. */
  downloadUrl: string;
};

type PicsumPhoto = {
  id: string;
  author: string;
  download_url: string;
};

export const photoKeys = {
  all: ['photos'] as const,
  list: (limit: number) => [...photoKeys.all, 'list', limit] as const,
};

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

/** Example of the server-state layer: remote data owned by React Query. */
export function usePhotos(limit = 20) {
  return useQuery({
    queryKey: photoKeys.list(limit),
    queryFn: ({ signal }) => fetchPhotos(limit, signal),
  });
}

/** Picsum serves arbitrary sizes by id, so thumbnails stay cheap. */
export function photoThumbnail(photo: Photo, width = 400, height = 300) {
  return `https://picsum.photos/id/${photo.id}/${width}/${height}`;
}
