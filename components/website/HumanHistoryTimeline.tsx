'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function HumanHistoryTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate time marker lines
  const generateTimeMarkers = () => {
    const markers = [];
    const numberOfMarkers = 50; // Adjust this number for more or fewer lines

    for (let i = 0; i < numberOfMarkers; i++) {
      markers.push(
        <motion.div
          key={i}
          className='h-full w-1.5 rounded-[4px] bg-gray-500'
          animate={{
            scale: hoveredIndex === i ? 1 : 0.4,
          }}
          initial={{ scale: 0.4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      );
    }
    return markers;
  };

  return (
    <div className='flex w-full justify-center'>
      <Card className='w-full max-w-3xl'>
        <CardHeader>
          <CardTitle>Outdoor Play in Human History</CardTitle>
          <CardDescription>
            Visualizing the time children spent playing outside throughout human
            history
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Timeline Container */}
          <div className='relative flex h-16 w-full items-center justify-between overflow-hidden rounded-sm bg-[#1b191b] px-1'>
            {generateTimeMarkers()}
          </div>
          {/* Annotations for Time Periods */}
          <div className='mt-2 flex justify-between text-sm text-muted-foreground'>
            <div>200,000 years ago</div>
            <div>Today</div>
          </div>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-muted-foreground'>
            As you can see, the timeline didn't change color or did anything
            special reaching the end. That's because the period from the 1970s
            to 2024 is so insignificant on this scale, it's virtually
            indistinguishable. We've only recently stopped playing outside, but
            this change is negligible in the context of our entire history.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
