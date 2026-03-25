import type { ReactElement } from 'react';

import { BouncingShape } from '@/components/shapes/bouncing-shape';

export interface AnimatedTedProps {
  scale?: number;
}

/**
 * AnimatedTed 組合元件：將多個 `BouncingShape` 組成動態「Ted」字樣。
 * 適合放在首屏視覺區（Hero）或作為裝飾性 Logo；可透過 `scale` 縮放而不破壞 flex／grid 排版。
 */
export function AnimatedTed({ scale = 1 }: AnimatedTedProps): ReactElement {
  return (
    <div
      className="flex justify-center items-center gap-2 "
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      <BouncingShape delay={0} letter="T" letterY={-40} shouldAnimate={false}>
        <rect x="-40" y="-80" width="80" height="80" rx="8" className="fill-current" />
      </BouncingShape>

      <BouncingShape delay={0} letter="e" letterY={-38}>
        <path
          d="M 0,0 L 38,-38 L 0,-76 L -38,-38 Z"
          strokeWidth="12"
          strokeLinejoin="round"
          className="fill-current stroke-current"
        />
      </BouncingShape>

      <BouncingShape delay={0} letter="d" letterY={-25} shouldAnimate={false}>
        <path
          d="M 0,-70 L 38,0 L -38,0 Z"
          strokeWidth="10"
          strokeLinejoin="round"
          className="fill-current stroke-current"
        />
      </BouncingShape>
    </div>
  );
}
