import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  // 強制觸發同層級 (也就是 app/[locale]/not-found.tsx) 的 404 頁面
  notFound();
}
