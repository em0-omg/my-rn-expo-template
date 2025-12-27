import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-5 dark:bg-gray-900">
      <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100">Modal</Text>
      <Link href="/" dismissTo className="mt-4 py-4">
        <Text className="text-blue-600 dark:text-blue-400">Go to Home</Text>
      </Link>
    </View>
  );
}
