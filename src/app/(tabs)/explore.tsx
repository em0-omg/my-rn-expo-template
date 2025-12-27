import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useTranslation } from '@/hooks/use-translation';

export default function TabTwoScreen() {
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          {t('explore.title')}
        </ThemedText>
      </ThemedView>
      <ThemedText>{t('explore.description')}</ThemedText>
      <Collapsible title={t('explore.fileRouting.title')}>
        <ThemedText>
          {t('explore.fileRouting.description1', {
            screen1: 'app/(tabs)/index.tsx',
            screen2: 'app/(tabs)/explore.tsx',
          })}
        </ThemedText>
        <ThemedText>
          {t('explore.fileRouting.description2', {
            file: 'app/(tabs)/_layout.tsx',
          })}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{t('common.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.platforms.title')}>
        <ThemedText>
          {t('explore.platforms.description', {
            key: 'w',
          })}
        </ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.images.title')}>
        <ThemedText>
          {t('explore.images.description', {
            suffix2x: '@2x',
            suffix3x: '@3x',
          })}
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{t('common.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.theming.title')}>
        <ThemedText>
          {t('explore.theming.description', {
            hook: 'useColorScheme()',
          })}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{t('common.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.animations.title')}>
        <ThemedText>
          {t('explore.animations.description', {
            file: 'components/HelloWave.tsx',
            library: 'react-native-reanimated',
          })}
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              {t('explore.animations.parallax', {
                file: 'components/ParallaxScrollView.tsx',
              })}
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
