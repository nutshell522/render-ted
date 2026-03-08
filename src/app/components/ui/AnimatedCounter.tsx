'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ targetValue = 10, duration = 0.8, suffix = '+' }: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 重設狀態以支援多次觸發
    setIsDone(false);
    const controls = animate(count, targetValue, { duration });

    controls.then(() => setIsDone(true));
    return () => controls.stop();
  }, [count, targetValue, duration]);

  return (
    <motion.div style={{ fontSize: '2rem', display: 'inline-flex', alignItems: 'center' }} animate={{ scale: [1, 1.05, 1] }}>
      <motion.span>{rounded}</motion.span>
      {isDone && (
        <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} style={{ marginLeft: '4px' }}>
          {suffix}
        </motion.span>
      )}
    </motion.div>
  );
}
