'use client';
import { ReactNode, useEffect, useRef } from 'react';

import { motion, useAnimation } from 'motion/react';

interface BouncingShapeProps {
  delay: number;
  letter: string;
  letterY: number;
  children: ReactNode;
  shouldAnimate?: boolean;
}

const BouncingShape: React.FC<BouncingShapeProps> = ({
  delay,
  letter,
  letterY,
  children,
  shouldAnimate = true,
}) => {
  const controls = useAnimation();
  const isAnimating = useRef(false);
  const playAnimation = async () => {
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
  };

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        playAnimation();
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnimate, delay]);

  const handleMouseEnter = () => {
    if (shouldAnimate) {
      playAnimation();
    }
  };

  return (
    <svg
      viewBox="0 0 100 200"
      className={`w-24 h-48 overflow-visible ${shouldAnimate ? 'cursor-pointer' : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      <g transform="translate(50, 170)">
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

export default BouncingShape;
