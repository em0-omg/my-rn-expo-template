import { Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background-secondary">
      <Text className="font-serif text-h2 font-semibold text-primary">Explore</Text>
      <Text className="mt-4 text-center font-serif text-body text-foreground">
        Design System is working!
      </Text>
      <View className="mt-8 rounded-lg bg-background-card p-6 shadow-md">
        <Text className="font-serif text-h4 font-semibold text-foreground-heading">
          Card Example
        </Text>
        <Text className="mt-2 font-serif text-caption text-foreground-muted">
          Styled with the Anthropic Design System
        </Text>
      </View>
      <View className="mt-6 max-w-readable px-4">
        <Text className="font-serif text-body leading-relaxed text-foreground">
          This template follows the Human-Centered AI design concept with Terra Cotta as the primary
          brand color, emphasizing warmth, trust, and accessibility.
        </Text>
      </View>
    </View>
  );
}
