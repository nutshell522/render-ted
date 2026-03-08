'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function Home() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const controls = animate(count, 10, { duration: 0.8 });

    // 機制：當動畫 Promise 解析完成後變更狀態
    controls.then(() => {
      setIsDone(true);
    });

    return () => controls.stop();
  }, [count]);

  return (
    <motion.div style={{ fontSize: '2rem', textAlign: 'center' }} initial={{ scale: 1 }} animate={{ scale: [1, 1.15, 1] }}>
      <motion.span>{rounded}</motion.span>

      {/* 使用 Framer Motion 製作加號彈出的動態效果 */}
      {isDone && (
        <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'inline-block', marginLeft: '5px' }}>
          +
        </motion.span>
      )}
    </motion.div>
  );
}
