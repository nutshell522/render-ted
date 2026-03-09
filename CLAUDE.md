# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Next.js dev server at localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Storybook
npm run storybook        # Start Storybook dev server at localhost:6006
npm run build-storybook  # Build Storybook static site

# Testing (Storybook stories run via Vitest + Playwright)
npx vitest           # Run all tests (headless Chromium)
```

## Architecture

This is a **Next.js 16 App Router** project with TypeScript, Tailwind CSS v4, and a component-driven development workflow via Storybook.

**Key stack:**

- **Styling**: Tailwind CSS v4 (PostCSS) + shadcn/ui token system. CSS variables for design tokens are defined in `src/app/globals.css` using `@theme inline`. Dark mode uses the `.dark` class variant.
- **Animations**: `motion` (Framer Motion v12) for component animations.
- **UI primitives**: `radix-ui` + `shadcn` for accessible components; `class-variance-authority` + `clsx` + `tailwind-merge` for variant management.
- **PDF generation**: `@react-pdf/renderer` is a dependency (not yet used in source).
- **i18n**: `next-intl` is a dependency (not yet wired up).
- **Font**: Custom local font `GlowSansTC` (Traditional Chinese), loaded via `next/font/local` in `layout.tsx`, exposed as CSS variable `--font-glow-sans`.

**Component conventions:**

- UI components live in `src/app/components/ui/`.
- Each component has a co-located `.stories.tsx` file for Storybook.
- Storybook uses `@storybook/nextjs-vite` framework and `@storybook/addon-vitest` to run story-based tests in a headless Chromium browser via Playwright.
- Components are `'use client'` by default since they use React hooks and Framer Motion.

**Testing:**

- Tests are written as Storybook stories (`.stories.tsx`). Vitest picks them up via the `storybookTest` plugin configured in `vitest.config.ts`. There is no separate unit test layer.

## Project Structure

### Root Level

```
/
├── .storybook/          # Storybook 全域設定檔
├── e2e/                 # 端對端測試 (Playwright 或 Cypress)
│   ├── specs/           # E2E 測試腳本
│   └── fixtures/        # E2E 專用的假資料或測試狀態設定
├── public/              # 靜態資源 (圖片、字體等)
├── src/                 # 核心程式碼
├── tests/               # 測試相關的全域設定與共用 Mock
│   ├── setup.ts         # Jest/Vitest 環境初始化檔
│   ├── utils.tsx        # 自訂的 render 函式 (例如包裝好 Provider 的 render)
│   └── mocks/           # MSW (Mock Service Worker) 的 API 模擬設定
├── .env.local           # 環境變數
├── tailwind.config.ts   # UI 框架設定
├── vitest.config.ts     # 單元/整合測試設定
└── package.json
```

### src Directory

採用功能模組化 (Feature-based Architecture)，依照業務領域拆分：

```
src/
├── app/                 # App Router (僅負責路由、Layout 與頁面組裝)
│   ├── (auth)/          # 路由群組 (不影響 URL 結構)
│   ├── api/             # Route Handlers (BFF 介接層或 Webhook)
│   ├── globals.css      # 全域樣式
│   ├── layout.tsx       # Root Layout
│   └── page.tsx         # 首頁
│
├── components/          # 全域共用 UI 元件 (Dumb Components)
│   ├── ui/              # 最基礎的元件 (Button, Input, Modal)
│   ├── layouts/         # 共用排版元件 (Header, Sidebar)
│   └── providers/       # 全域 Context Providers
│
├── features/            # 業務功能模組
│   └── <feature>/
│       ├── api/         # 該功能專屬的 API 請求
│       ├── components/  # 該功能專屬的 UI 元件 (Smart Components)
│       ├── hooks/       # 該功能專屬的商業邏輯 Hooks
│       ├── types/       # 該功能專屬的型別定義
│       └── __tests__/   # 該功能專屬的整合測試
│
├── hooks/               # 全域共用 Hooks
├── lib/                 # 第三方套件封裝與實例化
├── services/            # 跨模組的全域 API 呼叫或 WebSocket 管理
├── store/               # 全域狀態管理 (Zustand, Redux)
├── types/               # 全域型別定義
├── utils/               # 全域純函式
└── constants/           # 靜態常數、列舉 (Enums)、路由路徑定義
```

### Colocation Strategy

測試與 Story 放在被測試元件旁邊。以 Button 元件為例：

```
src/components/ui/Button/
├── index.ts             # 統一匯出
├── Button.tsx           # 元件實作碼
├── Button.module.css    # 樣式 (若使用 CSS Modules)
├── Button.stories.tsx   # Storybook 視覺展示與互動文件
└── Button.test.tsx      # 單元測試
```

### Testing Layers

| 類型                   | 檔案命名       | 位置                                | 工具         |
| ---------------------- | -------------- | ----------------------------------- | ------------ |
| 單元測試 (Unit)        | `*.test.ts(x)` | 緊貼元件/Hook/Utils（Colocation）   | Vitest       |
| 整合測試 (Integration) | `*.spec.ts(x)` | `src/features/<feature>/__tests__/` | Vitest + MSW |
| E2E 測試               | —              | 根目錄 `e2e/`                       | Playwright   |
