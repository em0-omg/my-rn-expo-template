import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, RefreshControl, Text, View } from 'react-native';

import { photoThumbnail, usePhotos, type Photo } from '@/hooks/use-photos';
import { useCount, useCounterActions } from '@/stores';

// Generic blurhash: the list endpoint does not ship per-photo hashes.
const PLACEHOLDER_BLURHASH =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function PhotoCard({ item }: { item: Photo }) {
  return (
    <View className="mx-4 mb-4 overflow-hidden rounded-lg bg-background-card shadow-sm">
      <Image
        source={{ uri: photoThumbnail(item) }}
        placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
        contentFit="cover"
        transition={300}
        style={{ width: '100%', height: 180 }}
      />
      <View className="p-3">
        <Text className="font-serif text-body font-medium text-foreground-heading">
          {item.author}
        </Text>
        <Text className="mt-1 font-serif text-caption text-foreground-muted">
          Fetched with TanStack Query, rendered with expo-image
        </Text>
      </View>
    </View>
  );
}

function CounterCard() {
  const count = useCount();
  const { increment, decrement, reset } = useCounterActions();

  return (
    <View className="mt-6 w-full max-w-xs rounded-lg bg-background-card p-5 shadow-md">
      <Text className="text-center font-serif text-h4 font-semibold text-foreground-heading">
        Counter: {count}
      </Text>

      <View className="mt-4 flex-row justify-center gap-3">
        <Pressable
          onPress={decrement}
          className="rounded-lg bg-foreground-muted px-5 py-3 active:opacity-80"
        >
          <Text className="font-serif text-body font-medium text-background">-</Text>
        </Pressable>

        <Pressable onPress={reset} className="rounded-lg bg-border px-5 py-3 active:opacity-80">
          <Text className="font-serif text-caption font-medium text-foreground">Reset</Text>
        </Pressable>

        <Pressable
          onPress={increment}
          className="rounded-lg bg-primary px-5 py-3 active:opacity-80"
        >
          <Text className="font-serif text-body font-medium text-background">+</Text>
        </Pressable>
      </View>

      <Text className="mt-4 text-center font-serif text-caption text-foreground-muted">
        Zustand holds client state — it persists across tabs
      </Text>
    </View>
  );
}

export default function ExploreScreen() {
  const { data: photos, isPending, isError, error, refetch, isRefetching } = usePhotos();

  return (
    <View className="flex-1 bg-background-secondary">
      <FlashList
        data={photos ?? []}
        renderItem={({ item }) => <PhotoCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListHeaderComponent={
          <View className="mb-6 items-center px-4">
            <Text className="font-serif text-h2 font-semibold text-primary">Explore</Text>
            <Text className="mt-2 text-center font-serif text-body text-foreground">
              FlashList + expo-image Demo
            </Text>

            <CounterCard />

            <View className="mt-6 w-full">
              <Text className="mb-2 font-serif text-h4 font-semibold text-foreground-heading">
                Photo Gallery
              </Text>
              <Text className="font-serif text-caption text-foreground-muted">
                TanStack Query owns this server state — pull down to refetch
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center px-8 py-10">
            {isPending ? (
              <>
                <ActivityIndicator />
                <Text className="mt-3 font-serif text-caption text-foreground-muted">
                  Loading photos…
                </Text>
              </>
            ) : isError ? (
              <>
                <Text className="text-center font-serif text-body text-foreground">
                  {error instanceof Error ? error.message : 'Could not load photos.'}
                </Text>
                <Pressable
                  onPress={() => refetch()}
                  className="mt-4 rounded-lg bg-primary px-5 py-3 active:opacity-80"
                >
                  <Text className="font-serif text-body font-medium text-background">Retry</Text>
                </Pressable>
              </>
            ) : (
              <Text className="font-serif text-caption text-foreground-muted">
                No photos to show.
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
}
