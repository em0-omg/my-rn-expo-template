import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-4xl font-bold text-blue-600 dark:text-blue-400">Hello World</Text>
      <Text className="mt-4 text-lg text-gray-600 dark:text-gray-300">Welcome to NativeWind!</Text>
      <View className="mt-8 flex-row gap-3">
        <View className="rounded-full bg-blue-500 px-4 py-2">
          <Text className="font-semibold text-white">Button 1</Text>
        </View>
        <View className="rounded-full bg-green-500 px-4 py-2">
          <Text className="font-semibold text-white">Button 2</Text>
        </View>
      </View>
    </View>
  );
}
