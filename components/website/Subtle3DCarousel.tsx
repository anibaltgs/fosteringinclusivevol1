'use client';

import {
  type PanInfo,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';
import {
  CodeIcon,
  CubeIcon,
  FileIcon,
  GearIcon,
  BoxIcon,
} from '@radix-ui/react-icons';

const ITEMS = [
  {
    title: 'UI Design',
    description: 'Design intuitive user interfaces and experiences.',
    icon: (
      <CubeIcon
        style={{
          width: '16px',
          height: '16px',
          color: 'rgba(128, 128, 128, 1)',
        }}
      />
    ),
    id: 1,
  },
  {
    title: 'Frontend Development',
    description: 'Build interactive, visually compelling web pages.',
    icon: (
      <CodeIcon
        style={{
          width: '16px',
          height: '16px',
          color: 'rgba(128, 128, 128, 1)',
        }}
      />
    ),
    id: 2,
  },
  {
    title: 'Motion Design',
    description: 'Create engaging animations and transitions.',
    icon: (
      <FileIcon
        style={{
          width: '16px',
          height: '16px',
          color: 'rgba(128, 128, 128, 1)',
        }}
      />
    ),
    id: 3,
  },
  {
    title: 'Design Engineer',
    description: 'Focusing on details, design systems, and code.',
    icon: (
      <GearIcon
        style={{
          width: '16px',
          height: '16px',
          color: 'rgba(128, 128, 128, 1)',
        }}
      />
    ),
    id: 4,
  },
  {
    title: 'Product Management',
    description: 'Manage product lifecycle, from conception to launch.',
    icon: (
      <BoxIcon
        style={{
          width: '16px',
          height: '16px',
          color: 'rgba(128, 128, 128, 1)',
        }}
      />
    ),
    id: 5,
  },
];

const ITEM_WIDTH = 200;
const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const CONTAINER_WIDTH = ITEM_WIDTH + GAP;

const SPRING_OPTIONS = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export default function Subtle3DCarousel() {
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, ITEMS.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const leftConstraint = -((ITEM_WIDTH + GAP) * (ITEMS.length - 1));

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        border: '1px solid rgba(200, 200, 200, 0.4)',
        padding: '16px',
        backgroundColor: 'rgba(250, 250, 250, 1)',
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          width: ITEM_WIDTH,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * ITEM_WIDTH + ITEM_WIDTH / 2}px`,
          x,
        }}
        drag='x'
        dragConstraints={{
          left: leftConstraint,
          right: 0,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * (ITEM_WIDTH + GAP)) }}
        transition={SPRING_OPTIONS}
      >
        {ITEMS.map((item, index) => {
          const range = [
            (-100 * (index + 1) * CONTAINER_WIDTH) / 100,
            (-100 * index * CONTAINER_WIDTH) / 100,
            (-100 * (index - 1) * CONTAINER_WIDTH) / 100,
          ];
          const nextIndex = Math.min(index + 1, ITEMS.length - 1);
          const prevIndex = Math.max(index - 1, 0);
          const outputRange = [nextIndex ? 90 : 90, 0, prevIndex ? -90 : -90];
          const rotateY = useTransform(x, range, outputRange, {
            clamp: false,
          });

          return (
            <motion.div
              key={index}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexShrink: 0,
                borderRadius: '8px',
                border: '1px solid rgba(200, 200, 200, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                width: ITEM_WIDTH,
                height: '100%',
                rotateY: rotateY,
              }}
              transition={SPRING_OPTIONS}
            >
              <div style={{ marginBottom: '16px', padding: '20px 20px 0' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(240, 240, 240, 1)',
                  }}
                >
                  {item.icon}
                </span>
              </div>
              <div style={{ padding: '0 20px 20px' }}>
                <div
                  style={{
                    marginBottom: '4px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#211f26',
                    fontFamily: 'Inter, sans-serif',
                    WebkitFontSmoothing: 'antialiased', // Added for font smoothing
                    MozOsxFontSmoothing: 'grayscale', // Added for font smoothing
                  }}
                >
                  {item.title}
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#65636d',
                    fontFamily: 'Inter, sans-serif',
                    WebkitFontSmoothing: 'antialiased', // Added for font smoothing
                    MozOsxFontSmoothing: 'grayscale', // Added for font smoothing
                    margin: 0, // Ensures no unexpected margins
                  }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            width: '150px',
            justifyContent: 'space-between',
            padding: '0 32px',
          }}
        >
          {ITEMS.map((_, index) => (
            <motion.div
              key={index}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor:
                  currentIndex === index
                    ? 'rgba(142, 140, 153, 1)' // #8e8c99
                    : 'rgba(220, 220, 220, 1)',
              }}
              animate={{ scale: currentIndex === index ? 1.2 : 1 }}
              onClick={() => setCurrentIndex(index)}
              transition={{
                duration: 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
