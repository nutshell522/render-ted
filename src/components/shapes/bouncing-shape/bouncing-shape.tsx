'use client';

import type { ReactElement, ReactNode } from 'react';

import { motion } from 'motion/react';

import { useBouncingAnimation } from './use-bouncing-animation';

export interface BouncingShapeProps {
  delay: number;
  letter: string;
  letterY: number;
  children: ReactNode;
  shouldAnimate?: boolean;
}

/**
 * BouncingShape：顯示一個帶有文字的 SVG 容器，並套用反彈動畫。
 *
 * @param delay - 首次播放動畫前的延遲（秒）
 * @param letter - 顯示在圖形中央的文字
 * @param letterY - 字母在 SVG 座標中的垂直偏移
 * @param children - 背景圖形（常見為 rect 或 path）
 * @param shouldAnimate - 為 false 時不播放動畫，且 hover 不會重播
 */
export function BouncingShape({
  delay,
  letter,
  letterY,
  children,
  shouldAnimate = true,
}: BouncingShapeProps): ReactElement {
  const { controls, handleMouseEnter } = useBouncingAnimation({ delay, shouldAnimate });

  return (
    <svg
      viewBox="0 0 100 200"
      className="w-24 h-48 overflow-visible text-gray-900 dark:text-gray-100"
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
            fontSize="48"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontFamily: 'sans-serif' }}
            className="fill-gray-50 dark:fill-gray-900"
          >
            {letter}
          </text>
        </motion.g>
      </g>
    </svg>
  );
}
