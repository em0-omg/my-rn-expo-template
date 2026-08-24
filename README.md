# React Native Expo テンプレート

React Native + Expo を使用したモバイルアプリケーション開発のためのテンプレートプロジェクトです。

## 特徴

- **Expo SDK 57** + **React Native 0.86** + **React 19.2**
- **ファイルベースルーティング** - expo-router によるシンプルなナビゲーション
- **多言語対応 (i18n)** - expo-localization + i18n-js による国際化
- **ダークモード対応** - システム設定に連動したテーマ切り替え
- **NativeWind** - Tailwind CSS によるスタイリング
- **Zustand** - 軽量なクライアント状態管理 + AsyncStorage による永続化
- **TanStack Query** - サーバー状態管理（フェッチ・キャッシュ・自動再検証）
- **New Architecture** - React Native の新アーキテクチャ有効
- **React Compiler** - 自動最適化による高パフォーマンス
- **型安全なルーティング** - TypeScript による型付きルート
- **テスト** - Jest + Testing Library によるユニットテスト
- **コード品質ツール** - ESLint + Prettier + Lefthook

## 技術スタック

### コアフレームワーク

| ライブラリ   | バージョン | 用途                       |
| ------------ | ---------- | -------------------------- |
| Expo         | ~57.0      | 開発プラットフォーム       |
| React Native | 0.86       | モバイルフレームワーク     |
| React        | 19.2       | UI ライブラリ              |
| TypeScript   | ~6.0       | 型システム                 |
| expo-router  | ~57.0      | ファイルベースルーティング |

### スタイリング

| ライブラリ   | バージョン | 用途                          |
| ------------ | ---------- | ----------------------------- |
| NativeWind   | ^4.2       | Tailwind CSS for React Native |
| Tailwind CSS | ^3.4       | ユーティリティファースト CSS  |

### 状態管理

| ライブラリ   | バージョン | 用途                       |
| ------------ | ---------- | -------------------------- |
| Zustand      | ^5.0       | 軽量なクライアント状態管理 |
| AsyncStorage | 2.2        | ローカル永続化ストレージ   |

### サーバー状態 (TanStack Query)

| ライブラリ            | バージョン | 用途                                         |
| --------------------- | ---------- | -------------------------------------------- |
| @tanstack/react-query | ^5.102     | リモートデータのフェッチ・キャッシュ・再検証 |

Zustand は**クライアント状態**（UI・ユーザー設定・ローカルデータ）を、TanStack Query は**サーバー状態**
（API から取得したデータ）を担当します。フェッチしたデータを Zustand ストアにコピーしないでください。
詳細は `.claude/rules/state-management-rule.md` を参照してください。

### 国際化

| ライブラリ        | バージョン | 用途                 |
| ----------------- | ---------- | -------------------- |
| expo-localization | ~57.0      | デバイスロケール取得 |
| i18n-js           | ^4.5       | 翻訳ライブラリ       |

### リスト・画像

| ライブラリ          | バージョン | 用途                               |
| ------------------- | ---------- | ---------------------------------- |
| @shopify/flash-list | 2.0        | 高性能リストコンポーネント         |
| expo-image          | ~57.0      | 高性能画像（blurhash, キャッシュ） |

### ナビゲーション・UI

| ライブラリ                                | バージョン | 用途                                      |
| ----------------------------------------- | ---------- | ----------------------------------------- |
| expo-router/react-navigation              | ~57.0      | ナビゲーション（expo-router に同梱）      |
| react-native-reanimated                   | ~4.5       | アニメーション                            |
| react-native-gesture-handler              | ~2.32      | ジェスチャー                              |
| expo-haptics                              | ~57.0      | 触覚フィードバック                        |
| @react-native-vector-icons/material-icons | ^13.1      | アイコン（Android/Web、Expo Go でも動作） |

### テスト

| ライブラリ                    | バージョン | 用途                           |
| ----------------------------- | ---------- | ------------------------------ |
| jest-expo                     | ~57.0      | Jest プリセット（Expo 向け）   |
| Jest                          | ~29.7      | テストランナー                 |
| @testing-library/react-native | ^14.0      | コンポーネント・フックのテスト |

詳細は `.claude/rules/testing-rule.md` を参照してください。

### 開発ツール

| ライブラリ | バージョン | 用途                 |
| ---------- | ---------- | -------------------- |
| ESLint     | ^9.39      | 静的解析             |
| Prettier   | ^3.9       | コードフォーマッター |
| Lefthook   | ^2.1       | Git フック管理       |

> ESLint 9 系は EOL ですが、`eslint-config-expo` が依存する `eslint-plugin-react` が ESLint 10 に
> 未対応のため、Expo エコシステムが追随するまで 9 系を維持します。
>
> `.github/workflows/ci.yml` は `main` への PR・push で lint・typecheck・フォーマットチェック・
> テストを実行します。`lefthook.yml` により、ローカルでも pre-commit で lint/format、pre-push で
> typecheck/test が自動実行されます。

## ディレクトリ構成

```
src/
├── app/              # ルーティング（expo-router）
│   ├── (tabs)/       # タブナビゲーション
│   │   ├── _layout.tsx   # タブバー設定
│   │   ├── index.tsx     # ホームタブ
│   │   └── explore.tsx   # 探索タブ
│   ├── _layout.tsx   # ルートレイアウト
│   └── modal.tsx     # モーダル画面
├── components/       # 共通コンポーネント
│   └── ui/           # UIプリミティブ
├── constants/        # 定数（テーマ、カラー等）
│   └── theme.ts      # デザインシステム設定
├── hooks/            # カスタムフック
│   ├── use-color-scheme.ts   # カラースキーム検出
│   ├── use-theme-color.ts    # テーマカラー取得
│   ├── use-translation.ts    # 翻訳フック
│   └── use-photos.ts         # TanStack Query の使用例
├── lib/              # ライブラリ設定
│   ├── i18n.ts           # 国際化設定
│   └── query-client.ts   # TanStack Query クライアント設定
├── locales/          # 翻訳ファイル
│   ├── en.ts         # 英語
│   ├── ja.ts         # 日本語
│   └── index.ts      # エクスポート
└── stores/           # Zustand ストア
    ├── app-store.ts      # アプリ全体の状態
    ├── counter-store.ts  # カウンター（サンプル）
    └── index.ts          # エクスポート
```

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npx expo start
```

起動後、以下の方法でアプリを開くことができます：

- **i** - iOS シミュレーター
- **a** - Android エミュレーター
- **w** - Web ブラウザ

## 開発

### パスエイリアス

`@/` を使用して `src/` ディレクトリからインポートできます。

```typescript
import { Colors } from '@/constants/theme';
import { useTranslation } from '@/hooks/use-translation';
import { useAppStore } from '@/stores';
```

### 多言語対応 (i18n)

`useTranslation` フックを使用して翻訳を取得します。

```tsx
import { useTranslation } from '@/hooks/use-translation';

function MyComponent() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <>
      <Text>{t('home.welcome')}</Text>
      <Text>{t('home.step1.description', { file: 'index.tsx', shortcut: 'cmd + d' })}</Text>
    </>
  );
}
```

#### 対応言語

- English (en)
- 日本語 (ja)

#### 言語の追加方法

1. `src/locales/` に翻訳ファイルを作成（例: `ko.ts`）
2. `src/locales/index.ts` でエクスポート
3. `src/lib/i18n.ts` の `SUPPORTED_LOCALES` と `I18n` インスタンスに言語を追加
4. `app.json` の `supportedLocales` に追加

言語の切り替えは必ず `useTranslation` の `setLocale` を使います（`i18n.locale` への直接代入は
再レンダリングされません）。

### 状態管理 (Zustand)

Zustand はクライアント状態（UI・ユーザー設定・ローカルデータ）を担当します。API から取得したデータは
Zustand ストアにコピーせず、TanStack Query に任せてください（後述）。

```tsx
import { useCounterStore, useAppStore } from '@/stores';

function Counter() {
  // 個別セレクター（パフォーマンス最適化）
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return <Button onPress={increment}>Count: {count}</Button>;
}

function App() {
  const isInitialized = useAppStore((state) => state.isInitialized);
  const setInitialized = useAppStore((state) => state.setInitialized);

  // アプリ初期化処理...
}
```

詳細は `.claude/rules/state-management-rule.md` を参照してください。

### サーバー状態管理 (TanStack Query)

`src/lib/query-client.ts` で作成した `queryClient` をルートレイアウトの `QueryClientProvider` に渡し、
`subscribeToAppStateFocus()` で React Native の `AppState` を React Query の `focusManager` に橋渡しし
ます（React Query 標準のフォーカス検出は Web 専用のため）。

```tsx
// src/app/_layout.tsx
useEffect(subscribeToAppStateFocus, []);

<QueryClientProvider client={queryClient}>{/* ... */}</QueryClientProvider>;
```

クエリキーはファクトリ関数でまとめ、フェッチ関数には `useQuery` が渡す `AbortSignal` をそのまま渡し
てリクエストをキャンセル可能にします。

```typescript
export const photoKeys = {
  all: ['photos'] as const,
  list: (limit: number) => [...photoKeys.all, 'list', limit] as const,
};

export function usePhotos(limit = 20) {
  return useQuery({
    queryKey: photoKeys.list(limit),
    queryFn: ({ signal }) => fetchPhotos(limit, signal),
  });
}
```

画面側では `isPending` / `isError` / `refetch` / `isRefetching` でローディング・エラー・
プルリフレッシュを表現します（`src/app/(tabs)/explore.tsx` を参照）。

### スタイリング (NativeWind)

Tailwind CSS クラスを使用してスタイリングします。

```tsx
import { View, Text } from 'react-native';

function Card() {
  return (
    <View className="rounded-lg bg-background-card p-5 shadow-sm">
      <Text className="font-serif text-h2 text-foreground-heading">タイトル</Text>
      <Text className="text-body text-foreground">本文テキスト</Text>
    </View>
  );
}
```

#### 利用可能なユーティリティクラス

- **ボタン**: `btn-primary`, `btn-secondary`
- **カード**: `card`
- **テキスト**: `text-display`
- **カラー**: `bg-primary`, `text-foreground`, `border-border`
- **タイポグラフィ**: `text-hero`, `text-h1`, `text-body`, `text-caption`

### 高性能リスト (FlashList)

`@shopify/flash-list` は FlatList のドロップイン代替として高いパフォーマンスを提供します。

```tsx
import { FlashList } from '@shopify/flash-list';

function PhotoGallery() {
  const photos = [...]; // 写真データ

  return (
    <FlashList
      data={photos}
      renderItem={({ item }) => <PhotoCard item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
```

**主な特徴:**

- FlatList より高速なレンダリング
- メモリ効率の良いリサイクル機構
- v2 ではアイテムサイズを自動計測（`estimatedItemSize` は廃止され、渡すと型エラー）

### 画像 (expo-image)

`expo-image` は高性能な画像コンポーネントで、blurhash プレースホルダーやキャッシュ機能を提供します。

```tsx
import { Image } from 'expo-image';

function Avatar() {
  return (
    <Image
      source={{ uri: 'https://example.com/photo.jpg' }}
      placeholder={{ blurhash: '|rF?hV%2WCj[ayj[a|j[az...' }}
      contentFit="cover"
      transition={300}
      style={{ width: 100, height: 100 }}
    />
  );
}
```

**主な特徴:**

- blurhash/thumbhash プレースホルダー対応
- 自動キャッシュ管理
- スムーズなトランジション
- 多様な `contentFit` オプション（cover, contain, fill など）

### テーマ

`useColorScheme` と `useThemeColor` フックでダーク/ライトモードに対応できます。

```tsx
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

function MyComponent() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View style={{ backgroundColor }}>
      <Text>現在のテーマ: {colorScheme}</Text>
    </View>
  );
}
```

### プラットフォーム固有のコード

ファイル拡張子でプラットフォーム別の実装を分離できます。

```
component.tsx        # デフォルト（フォールバック）
component.ios.tsx    # iOS 専用
component.android.tsx # Android 専用
component.web.ts     # Web 専用
```

### テスト

ユニットテストは `__tests__/` ディレクトリにコードと並べて配置し、`npm test` で実行します。

```tsx
import { render, screen } from '@testing-library/react-native';

it('renders its children', async () => {
  // @testing-library/react-native v14 では render/renderHook/fireEvent/act が
  // すべて非同期になったため、必ず await します。
  await render(<ThemedText>Hello</ThemedText>);
  expect(screen.getByText('Hello')).toBeOnTheScreen();
});
```

TanStack Query を使うフックのテストは、アプリ共有の `queryClient` ではなく
`retry: false` / `gcTime: 0` を指定したテスト用の `QueryClient` を作成します
（`src/hooks/__tests__/use-photos.test.tsx` を参照）。

結合テスト・E2E テストは同梱していません。必要になった機能が出てきた時点で
Maestro や Detox などを追加する方針です（誰も動かさないテスト基盤を抱え込まないため）。

詳細は `.claude/rules/testing-rule.md` を参照してください。

## コマンド

| コマンド                | 説明                         |
| ----------------------- | ---------------------------- |
| `npm start`             | 開発サーバーを起動           |
| `npm run ios`           | iOS シミュレーターで起動     |
| `npm run android`       | Android エミュレーターで起動 |
| `npm run web`           | Web ブラウザで起動           |
| `npm run lint`          | ESLint でコードチェック      |
| `npm run typecheck`     | TypeScript で型チェック      |
| `npm test`              | ユニットテストを実行         |
| `npm run format`        | Prettier でコード整形        |
| `npm run reset-project` | プロジェクトを初期化         |

## 新規プロジェクトの開始

このテンプレートをベースに新しいプロジェクトを始める場合：

```bash
npm run reset-project
```

このコマンドで現在のサンプルコードが `app-example/` に移動し、空の `app/` ディレクトリが作成されます。

## デザインシステム

このプロジェクトは Anthropic 風のデザインシステムを採用しています。

- **ブランドカラー**: Terra Cotta (#da7756)
- **コンセプト**: Human-Centered AI
- **フォント**: セリフ体を優先（学術的・研究志向のイメージ）

詳細は `.claude/rules/design-system-rule.md` を参照してください。

## 参考リンク

- [Expo ドキュメント](https://docs.expo.dev/)
- [React Native ドキュメント](https://reactnative.dev/docs/getting-started)
- [expo-router ドキュメント](https://docs.expo.dev/router/introduction/)
- [Expo Localization](https://docs.expo.dev/versions/latest/sdk/localization/)
- [NativeWind](https://www.nativewind.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [FlashList](https://shopify.github.io/flash-list/docs/)
- [expo-image](https://docs.expo.dev/versions/latest/sdk/image/)
- [Testing Library (React Native)](https://callstack.github.io/react-native-testing-library/)
