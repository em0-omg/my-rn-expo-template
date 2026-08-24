import { Pressable, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';

import { useCount, useCounterActions } from '@/stores';

// Sample data for FlashList demo with picsum photos
const PHOTO_DATA = Array.from({ length: 20 }, (_, index) => ({
  id: `photo-${index + 1}`,
  title: `Photo ${index + 1}`,
  imageUrl: `https://picsum.photos/seed/${index + 1}/400/300`,
  blurhash:
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[',
}));

type PhotoItem = (typeof PHOTO_DATA)[number];

function PhotoCard({ item }: { item: PhotoItem }) {
  return (
    <View className="mx-4 mb-4 overflow-hidden rounded-lg bg-background-card shadow-sm">
      <Image
        source={{ uri: item.imageUrl }}
        placeholder={{ blurhash: item.blurhash }}
        contentFit="cover"
        transition={300}
        style={{ width: '100%', height: 180 }}
      />
      <View className="p-3">
        <Text className="font-serif text-body font-medium text-foreground-heading">
          {item.title}
        </Text>
        <Text className="mt-1 font-serif text-caption text-foreground-muted">
          Loaded with expo-image + blurhash placeholder
        </Text>
      </View>
    </View>
  );
}

export default function ExploreScreen() {
  const count = useCount();
  const { increment, decrement, reset } = useCounterActions();

  return (
    <View className="flex-1 bg-background-secondary">
      <FlashList
        data={PHOTO_DATA}
        renderItem={({ item }) => <PhotoCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <View className="mb-6 items-center px-4">
            <Text className="font-serif text-h2 font-semibold text-primary">Explore</Text>
            <Text className="mt-2 text-center font-serif text-body text-foreground">
              FlashList + expo-image Demo
            </Text>

            {/* Counter Demo Card */}
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

                <Pressable
                  onPress={reset}
                  className="rounded-lg bg-border px-5 py-3 active:opacity-80"
                >
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
                Zustand state persists across tabs
              </Text>
            </View>

            <View className="mt-6 w-full">
              <Text className="mb-2 font-serif text-h4 font-semibold text-foreground-heading">
                Photo Gallery
              </Text>
              <Text className="font-serif text-caption text-foreground-muted">
                High-performance list powered by FlashList with smooth image loading
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
}
