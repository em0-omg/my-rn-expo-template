import { Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800">
      <Text className="text-3xl font-bold text-purple-600 dark:text-purple-400">Explore</Text>
      <Text className="mt-4 text-center text-gray-600 dark:text-gray-300">
        TailwindCSS is working!
      </Text>
      <View className="mt-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-700">
        <Text className="text-lg font-medium text-gray-800 dark:text-gray-100">Card Example</Text>
        <Text className="mt-2 text-gray-500 dark:text-gray-400">Styled with className prop</Text>
      </View>
    </View>
  );
}
