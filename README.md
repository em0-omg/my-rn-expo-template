# React Native Expo テンプレート

React Native + Expo を使用したモバイルアプリケーション開発のためのテンプレートプロジェクトです。

## 特徴

- **Expo SDK 54** + **React Native 0.81**
- **ファイルベースルーティング** - expo-router によるシンプルなナビゲーション
- **多言語対応 (i18n)** - expo-localization + i18n-js による国際化
- **ダークモード対応** - システム設定に連動したテーマ切り替え
- **New Architecture** - React Native の新アーキテクチャ有効
- **React Compiler** - 自動最適化による高パフォーマンス
- **型安全なルーティング** - TypeScript による型付きルート
- **コード品質ツール** - ESLint + Prettier + Lefthook

## ディレクトリ構成

```
src/
├── app/              # ルーティング（expo-router）
│   ├── (tabs)/       # タブナビゲーション
│   ├── _layout.tsx   # ルートレイアウト
│   └── modal.tsx     # モーダル画面
├── components/       # 共通コンポーネント
│   └── ui/           # UIプリミティブ
├── constants/        # 定数（テーマ、カラー等）
├── hooks/            # カスタムフック
├── lib/              # ライブラリ設定
└── locales/          # 翻訳ファイル
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
```

### 多言語対応 (i18n)

`useTranslation` フックを使用して翻訳を取得します。

```tsx
import { useTranslation } from '@/hooks/use-translation';

function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t('home.welcome')}</Text>;
}
```

#### 対応言語

- English (en)
- 日本語 (ja)

#### 言語の追加方法

1. `src/locales/` に翻訳ファイルを作成（例: `ko.ts`）
2. `src/locales/index.ts` でエクスポート
3. `src/lib/i18n.ts` に言語を追加
4. `src/hooks/use-translation.ts` の `SUPPORTED_LOCALES` に追加
5. `app.json` の `supportedLocales` に追加

### テーマ

`useColorScheme` と `useThemeColor` フックでダーク/ライトモードに対応できます。

```tsx
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

function MyComponent() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
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

## コマンド

| コマンド                | 説明                         |
| ----------------------- | ---------------------------- |
| `npm start`             | 開発サーバーを起動           |
| `npm run ios`           | iOS シミュレーターで起動     |
| `npm run android`       | Android エミュレーターで起動 |
| `npm run web`           | Web ブラウザで起動           |
| `npm run lint`          | ESLint でコードチェック      |
| `npm run format`        | Prettier でコード整形        |
| `npm run reset-project` | プロジェクトを初期化         |

## 新規プロジェクトの開始

このテンプレートをベースに新しいプロジェクトを始める場合：

```bash
npm run reset-project
```

このコマンドで現在のサンプルコードが `app-example/` に移動し、空の `app/` ディレクトリが作成されます。

## 参考リンク

- [Expo ドキュメント](https://docs.expo.dev/)
- [React Native ドキュメント](https://reactnative.dev/docs/getting-started)
- [expo-router ドキュメント](https://docs.expo.dev/router/introduction/)
- [Expo Localization](https://docs.expo.dev/versions/latest/sdk/localization/)
