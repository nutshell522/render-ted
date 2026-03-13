'use client';
import { FC, useEffect, useState } from 'react';

import { animate, motion, useMotionValue, useTransform } from 'motion/react';

export interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
}

/**
 * 動態數字跳動元件 (Animated Counter)
 * * 透過 Framer Motion 的 useMotionValue 達到平滑的數字遞增效果。
 * * 數字跳動過程中不會顯示後綴，跳動結束後才會平滑淡入後綴符號。
 */
export const AnimatedCounter: FC<AnimatedCounterProps> = ({
  targetValue = 10,
  duration = 0.8,
  suffix = '+',
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const controls = animate(count, targetValue, {
      duration,
      onPlay: () => {
        setIsDone(false);
      },
      onComplete: () => {
        setIsDone(true);
      },
    });

    return () => controls.stop();
  }, [count, targetValue, duration]);

  return (
    <motion.div
      style={{ fontSize: '2rem', display: 'inline-flex', alignItems: 'center' }}
      animate={{ scale: [1, 1.05, 1] }}
    >
      <motion.span>{rounded}</motion.span>
      {isDone && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ marginLeft: '4px' }}
        >
          {suffix}
        </motion.span>
      )}
    </motion.div>
  );
};
