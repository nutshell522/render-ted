import { FC } from 'react';

import { BouncingShape } from '@/app/components/shapes/BouncingShape';

export interface AnimatedTedProps {
  scale?: number;
}

/**
 * AnimatedTed 組合元件
 * * 將多個 BouncingShape 組合在一起，呈現帶有動畫與特定幾何背景的 "Ted" 字樣。
 * 用於首頁的視覺焦點 (Hero Section) 或是全域的品牌 Logo。
 * 透過傳入 scale 屬性即可自由縮放，不影響 Flex/Grid 排版空間。
 */
export const AnimatedTed: FC<AnimatedTedProps> = ({ scale = 1 }) => {
  return (
    <div
      className="flex justify-center items-center gap-2 "
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      <BouncingShape delay={0} letter="T" letterY={-40} shouldAnimate={false}>
        <rect x="-40" y="-80" width="80" height="80" rx="8" fill="#111827" />
      </BouncingShape>

      <BouncingShape delay={0} letter="e" letterY={-38}>
        <path
          d="M 0,0 L 38,-38 L 0,-76 L -38,-38 Z"
          fill="#111827"
          stroke="#111827"
          strokeWidth="12"
          strokeLinejoin="round"
        />
      </BouncingShape>

      <BouncingShape delay={0} letter="d" letterY={-25} shouldAnimate={false}>
        <path
          d="M 0,-70 L 38,0 L -38,0 Z"
          fill="#111827"
          stroke="#111827"
          strokeWidth="10"
          strokeLinejoin="round"
        />
      </BouncingShape>
    </div>
  );
};
