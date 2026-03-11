import BouncingShape from './BouncingShape';

export default function AnimatedTed() {
  return (
    <div className="flex justify-center items-center gap-2 min-h-screen bg-gray-50">
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
}
