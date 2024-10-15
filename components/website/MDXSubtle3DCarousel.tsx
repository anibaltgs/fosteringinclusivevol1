import dynamic from 'next/dynamic';

const Subtle3DCarousel = dynamic(
  () => import('@/components/website/Subtle3DCarousel'),
  { ssr: false }
);

export default function MDXSubtle3DCarousel() {
  return <Subtle3DCarousel />;
}
