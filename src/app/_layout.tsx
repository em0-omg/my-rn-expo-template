import '../../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import { NavigationTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient, subscribeToAppStateFocus } from '@/lib/query-client';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(subscribeToAppStateFocus, []);

  return (
    <QueryClientProvider client={queryClient}>
      <View className={`flex-1 ${isDark ? 'dark' : ''}`}>
        <ThemeProvider value={isDark ? NavigationTheme.dark : NavigationTheme.light}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style={isDark ? 'light' : 'dark'} />
        </ThemeProvider>
      </View>
    </QueryClientProvider>
  );
}
