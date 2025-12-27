import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="font-serif text-h1 font-semibold text-foreground-heading">Hello World</Text>
      <Text className="mt-4 font-serif text-body-lg text-foreground">
        Welcome to the Design System!
      </Text>
      <Text className="mt-2 font-serif text-caption text-foreground-muted">Human-Centered AI</Text>
      <View className="mt-8 flex-row gap-3">
        <View className="rounded-md bg-primary px-6 py-3">
          <Text className="font-serif font-medium text-white">Primary</Text>
        </View>
        <View className="rounded-md border border-border bg-transparent px-6 py-3">
          <Text className="font-serif font-medium text-foreground">Secondary</Text>
        </View>
      </View>
      <View className="mt-6 rounded-lg bg-background-card p-5 shadow-sm">
        <Text className="font-serif text-body text-foreground">This is a card component</Text>
      </View>
    </View>
  );
}
