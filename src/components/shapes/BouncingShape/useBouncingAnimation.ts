import { useCallback, useEffect, useRef } from 'react';

import { LegacyAnimationControls, useAnimation } from 'motion/react';

interface UseBouncingAnimationProps {
  delay: number;
  shouldAnimate: boolean;
}

interface UseBouncingAnimationReturn {
  controls: LegacyAnimationControls;
  handleMouseEnter: () => void;
}

/**
 * BouncingShape 動畫邏輯的 Custom Hook
 * 控制 SVG 元素旋轉、縮放等物理反彈效果
 */
export const useBouncingAnimation = ({
  delay,
  shouldAnimate,
}: UseBouncingAnimationProps): UseBouncingAnimationReturn => {
  const controls = useAnimation();
  const isAnimating = useRef(false);

  const playAnimation = useCallback(async () => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    await controls.start({
      rotate: [0, 8, 5, 22, -4, 0],
      scaleX: [1, 1, 1, 1.15, 0.92, 1],
      scaleY: [1, 1, 1, 0.85, 1.08, 1],
      transition: {
        duration: 2.5,
        times: [0, 0.25, 0.45, 0.8, 0.9, 1],
        ease: [
          [0.4, 0, 0.6, 1], // 緩慢微傾 (眼皮變重)
          [0.4, 0, 0.6, 1], // 稍微拉回 (試圖清醒)
          [0.6, 0.05, 1, 1], // 加速倒下，帶著重力往下砸
          [0.2, 0.8, 0.4, 1], // 瞬間驚醒，配合 easing 曲線讓擠壓感「彈」出來
          [0.5, 0, 0.5, 1], // 餘震晃動，恢復平靜
        ],
      },
    });

    isAnimating.current = false;
  }, [controls]);

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        playAnimation();
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, delay, playAnimation]);

  const handleMouseEnter = useCallback(() => {
    if (shouldAnimate) {
      playAnimation();
    }
  }, [shouldAnimate, playAnimation]);

  return { controls, handleMouseEnter };
};
