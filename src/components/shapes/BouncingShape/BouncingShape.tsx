'use client';
import { ReactNode } from 'react';

import { motion } from 'motion/react';

import { useBouncingAnimation } from './useBouncingAnimation';

export interface BouncingShapeProps {
  delay: number;
  letter: string;
  letterY: number;
  children: ReactNode;
  shouldAnimate?: boolean;
}

/**
 * BouncingShape 元件：顯示一個帶有文字的 SVG 容器，並套用反彈動畫
 * * @param delay - 動畫初次觸發前的延遲秒數
 * @param letter - 顯示在圖形中央的英文字母
 * @param letterY - 調整文字在 SVG 內部的垂直位移
 * @param children - 背景圖形 (通常是 rect 或 circle)
 * @param shouldAnimate - 是否啟用動畫與 Hover 互動
 */
export const BouncingShape: React.FC<BouncingShapeProps> = ({
  delay,
  letter,
  letterY,
  children,
  shouldAnimate = true,
}) => {
  const { controls, handleMouseEnter } = useBouncingAnimation({ delay, shouldAnimate });

  return (
    <svg
      viewBox="0 0 100 200"
      className={`w-24 h-48 overflow-visible`}
      onMouseEnter={handleMouseEnter}
    >
      <g transform="translate(50, 100)">
        <motion.g
          animate={controls}
          initial={{ rotate: 0, scaleX: 1, scaleY: 1 }}
          style={{ originX: '50%', originY: '100%' }}
          transformTemplate={({ rotate, scaleX, scaleY }) =>
            `scale(${scaleX ?? 1}, ${scaleY ?? 1}) rotate(${rotate ?? '0deg'})`
          }
        >
          {children}
          <text
            x="0"
            y={letterY}
            fill="#F9FAFB"
            fontSize="48"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontFamily: 'sans-serif' }}
          >
            {letter}
          </text>
        </motion.g>
      </g>
    </svg>
  );
};
