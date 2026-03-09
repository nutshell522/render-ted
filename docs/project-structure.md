# Project Structure

## 根目錄架構 (Root Level)

根目錄主要將「與原始碼無關的設定」以及「E2E 測試」分離出來，保持 `src/` 的純淨。

```
/
├── .storybook/          # Storybook 全域設定檔
├── e2e/                 # 端對端測試 (Playwright 或 Cypress)
│   ├── specs/           # E2E 測試腳本
│   └── fixtures/        # E2E 專用的假資料或測試狀態設定
├── public/              # 靜態資源 (圖片、字體等)
├── src/                 # 核心程式碼 (詳見下方)
├── tests/               # 測試相關的全域設定與共用 Mock
│   ├── setup.ts         # Jest/Vitest 環境初始化檔
│   ├── utils.tsx        # 自訂的 render 函式 (例如包裝好 Provider 的 render)
│   └── mocks/           # MSW (Mock Service Worker) 的 API 模擬設定
├── .env.local           # 環境變數
├── tailwind.config.ts   # UI 框架設定
├── vitest.config.ts     # 單元/整合測試設定
└── package.json
```

## src 目錄結構

針對中大型專案，採用「功能模組化 (Feature-based Architecture)」，依照業務領域拆分，而非把所有元件集中在單一資料夾。

```
src/
├── app/                 # App Router (僅負責路由、Layout 與頁面組裝)
│   ├── (auth)/          # 路由群組 (不影響 URL 結構)
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── api/             # Route Handlers (BFF 介接層或 Webhook)
│   ├── globals.css      # 全域樣式
│   ├── layout.tsx       # Root Layout (放入各類 Provider)
│   └── page.tsx         # 首頁
│
├── components/          # 全域共用 UI 元件 (Dumb Components)
│   ├── ui/              # 最基礎的元件 (Button, Input, Modal)
│   ├── layouts/         # 共用排版元件 (Header, Sidebar)
│   └── providers/       # 全域 Context Providers
│
├── features/            # 業務功能模組
│   ├── authentication/  # 以「身分驗證」功能為例
│   │   ├── api/         # 該功能專屬的 API 請求
│   │   ├── components/  # 該功能專屬的 UI 元件 (Smart Components)
│   │   ├── hooks/       # 該功能專屬的商業邏輯 Hooks
│   │   ├── types/       # 該功能專屬的型別定義
│   │   └── __tests__/   # 該功能專屬的整合測試
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

## 測試與 Storybook 的就近放置策略

將測試與 Story 放在被測試檔案的旁邊（Colocation），而非集中在獨立的 `tests/` 或 `stories/` 資料夾。這樣在修改元件時，樣式、文件（Story）和測試皆在同一目錄下，刪除元件時也能一併清除。

### Button 元件目錄結構範例

```
src/components/ui/Button/
├── index.ts             # 統一匯出 (export * from './Button')
├── Button.tsx           # 元件實作碼
├── Button.module.css    # 樣式 (若使用 CSS Modules)
├── Button.stories.tsx   # Storybook 視覺展示與互動文件
└── Button.test.tsx      # 單元測試 (測試點擊、Disable 狀態等)
```

## 測試分層策略

### 單元測試 (Unit Tests)

- **檔案命名**：`*.test.ts` / `*.test.tsx`
- **位置**：緊貼程式碼（Colocation），與元件、Hooks 或 Utils 放在同一層
- **測試目標**：Utils（純函式邏輯）、Hooks（狀態變化）、共用 UI 元件（Props 傳遞與基礎 DOM 事件）
- **工具**：Vitest

### 整合測試 (Integration Tests)

- **檔案命名**：`*.spec.ts` / `*.spec.tsx`，或集中於各功能模組的 `__tests__/` 目錄
- **位置**：`src/features/<feature>/__tests__/`
- **測試目標**：跨元件的資料流、與 API 的互動（搭配 MSW mock）、頁面級別的使用者流程

### 端對端測試 (E2E Tests)

- **位置**：根目錄的 `e2e/` 資料夾，與 `src/` 完全分離
- **測試目標**：完整的使用者操作流程（登入、結帳等關鍵路徑），在真實瀏覽器環境中驗證
- **工具**：Playwright
