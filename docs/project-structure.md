# Project Structure

## 根目錄架構 (Root Level)

將「與原始碼無關的設定」以及「E2E 測試」分離出來，保持 `src/` 的純淨。

```text
/
├── .storybook/          # Storybook 全域設定檔
├── e2e/                 # 端對端測試 (Playwright/Cypress)
│   ├── specs/           # E2E 測試腳本
│   └── fixtures/        # E2E 專用假資料或測試狀態設定
├── public/              # 靜態資源 (圖片、字體等)
├── src/                 # 核心程式碼 (詳見下方)
├── tests/               # 測試相關的全域設定與共用 Mock
│   ├── setup.ts         # Jest/Vitest 環境初始化檔
│   ├── utils.tsx        # 自訂 render 函式 (如包裝好 Provider 的 render)
│   └── mocks/           # MSW (Mock Service Worker) API 模擬設定
├── .env.local           # 環境變數
├── tailwind.config.ts   # UI 框架設定
├── vitest.config.ts     # 單元/整合測試設定
└── package.json
```

## src 目錄結構

採用「功能模組化 (Feature-based Architecture)」，依照業務領域拆分，避免所有元件集中在單一資料夾。

```text
src/
├── app/                 # App Router (僅負責路由、Layout 與頁面組裝)
│   ├── (auth)/          # 路由群組 (不影響 URL 結構)
│   ├── api/             # Route Handlers (BFF 介接層或 Webhook)
│   ├── globals.css      # 全域樣式
│   ├── layout.tsx       # Root Layout (放入各類 Provider)
│   └── page.tsx         # 首頁
│
├── components/          # 全域共用 UI 元件 (Dumb Components)
│   ├── ui/              # 基礎元件 (Button, Input, Modal)
│   ├── layouts/         # 排版元件 (Header, Sidebar)
│   ├── providers/       # 全域 Context Providers
│   ├── shapes/          # 基礎形狀與 SVG 視覺元件 (如 BouncingShape)
│   ├── animations/      # 純動畫與動態行為元件 (如 AnimatedCounter)
│   └── composites/      # 組合型元件，跨基礎元件的結合 (如 AnimatedTed)
│
├── features/            # 業務功能模組 (以身分驗證為例)
│   ├── authentication/
│   │   ├── api/         # 該功能專屬 API 請求
│   │   ├── components/  # 該功能專屬 UI 元件 (Smart Components)
│   │   ├── hooks/       # 該功能專屬商業邏輯 Hooks
│   │   ├── types/       # 該功能專屬型別定義
│   │   └── __tests__/   # 該功能專屬整合測試
│   └── products/        # 其他業務模組
│
├── hooks/               # 全域共用 Hooks (如 useDebounce, useWindowSize)
├── lib/                 # 第三方套件封裝與實例化 (Axios, Dayjs, Prisma)
├── services/            # 跨模組的全域 API 呼叫或 WebSocket 管理
├── store/               # 全域狀態管理 (Zustand, Redux)
├── types/               # 全域型別定義 (如 API 共用回傳格式)
├── utils/               # 全域純函式 (Pure Functions，如字串格式化)
└── constants/           # 靜態常數、列舉 (Enums)、路由路徑定義

```

## 元件與測試就近放置策略 (Colocation)

將測試、Storybook 以及該元件專屬的邏輯 (Hook) 放在被測試檔案的旁邊。修改元件時，樣式、文件、邏輯和測試皆在同一目錄下，刪除元件時也能一併乾淨清除。

### 1. 基礎元件目錄結構

```text
src/components/ui/Button/
├── index.ts             # 統一匯出 (export * from './Button')
├── Button.tsx           # 元件實作碼
├── Button.stories.tsx   # Storybook 視覺展示與互動文件
└── Button.test.tsx      # 單元測試 (測試點擊、狀態等)

```

### 2. 複雜元件目錄結構 (含專屬邏輯)

若元件內部包含複雜邏輯 (如 Framer Motion 動畫)，將邏輯抽離成專屬 Hook 放置於同目錄，`index.ts` 僅對外暴露 UI 元件。

```text
src/components/shapes/BouncingShape/
├── index.ts                 # 統一匯出 (export * from './BouncingShape')
├── BouncingShape.tsx        # UI 渲染元件 (維持純淨)
├── useBouncingAnimation.ts  # 該元件專屬的動畫邏輯 Hook
├── BouncingShape.stories.tsx
└── BouncingShape.test.tsx

```

## 測試分層策略

### 單元測試 (Unit Tests)

- **檔案命名**：`*.test.ts` / `*.test.tsx`
- **位置**：緊貼程式碼 (Colocation)，與元件、Hooks 或 Utils 放在同一層。
- **測試目標**：Utils (純函式邏輯)、Hooks (狀態變化)、共用 UI 元件 (Props 傳遞與基礎 DOM 事件)。
- **工具**：Vitest

### 整合測試 (Integration Tests)

- **檔案命名**：`*.spec.ts` / `*.spec.tsx`
- **位置**：集中於各功能模組的 `__tests__/` 目錄 (`src/features/<feature>/__tests__/`)。
- **測試目標**：跨元件資料流、API 互動 (搭配 MSW mock)、頁面級別使用者流程。
- **工具**：Vitest + React Testing Library

### 端對端測試 (E2E Tests)

- **位置**：獨立於 `src/` 之外的根目錄 `e2e/` 資料夾。
- **測試目標**：真實瀏覽器環境中的完整使用者操作流程 (登入、結帳等關鍵路徑)。
- **工具**：Playwright
