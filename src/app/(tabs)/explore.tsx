import { Pressable, Text, View } from 'react-native';

import { useCount, useCounterActions } from '@/stores';

export default function ExploreScreen() {
  const count = useCount();
  const { increment, decrement, reset } = useCounterActions();

  return (
    <View className="flex-1 items-center justify-center bg-background-secondary">
      <Text className="font-serif text-h2 font-semibold text-primary">Explore</Text>
      <Text className="mt-4 text-center font-serif text-body text-foreground">
        Zustand State Management Demo
      </Text>

      {/* Counter Demo Card */}
      <View className="mt-8 w-72 rounded-lg bg-background-card p-6 shadow-md">
        <Text className="text-center font-serif text-h4 font-semibold text-foreground-heading">
          Counter: {count}
        </Text>

        <View className="mt-6 flex-row justify-center gap-3">
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
      </View>

      <View className="mt-6 max-w-readable px-4">
        <Text className="font-serif text-body leading-relaxed text-foreground">
          This counter demonstrates Zustand state management. The state persists across tab
          navigation.
        </Text>
      </View>
    </View>
  );
}
