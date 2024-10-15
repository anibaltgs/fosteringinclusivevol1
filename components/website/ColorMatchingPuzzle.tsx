'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const imagePaths = ['/1.png', '/2.png', '/3.png'];
const textItems = ['equality', 'equity', 'reality'];
const initialBottomOrder = ['equity', 'reality', 'equality'];

const DynamicReorderGroup = dynamic(
  () => import('framer-motion').then((mod) => mod.Reorder.Group),
  { ssr: false }
);

const DynamicReorderItem = dynamic(
  () => import('framer-motion').then((mod) => mod.Reorder.Item),
  { ssr: false }
);

interface PuzzlePieceProps {
  content: string;
  isImage: boolean;
  fixed?: boolean;
  matched?: boolean;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  content,
  isImage,
  fixed = false,
  matched = false,
}) => (
  <motion.div
    className={`relative overflow-hidden rounded-md ${fixed ? '' : 'cursor-move'} ${
      matched ? 'glow-effect' : ''
    } ${isImage ? 'aspect-[203/376] h-auto w-full' : 'h-auto w-auto'}`}
    whileHover={{ scale: fixed ? 1 : 1.05 }}
    whileTap={{ scale: fixed ? 1 : 0.95 }}
  >
    {isImage ? (
      <div className='relative h-0 w-full pb-[185%]'>
        <Image
          src={content}
          alt='Puzzle piece'
          fill
          className='object-contain'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
        />
      </div>
    ) : (
      <div
        className={`flex h-full w-full items-center justify-center rounded-md px-3 py-1 text-sm font-medium ${
          matched
            ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'
        }`}
      >
        {content}
      </div>
    )}
  </motion.div>
);

interface ColorMatchingPuzzleProps {
  className?: string;
}

const ImageTextMatchingPuzzle: React.FC<ColorMatchingPuzzleProps> = ({
  className,
}) => {
  const [topItems] = useState([...imagePaths]);
  const [bottomItems, setBottomItems] = useState(initialBottomOrder);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMatched = (index: number) => {
    return textItems[index] === bottomItems[index];
  };

  const handleReorder = (newOrder: unknown[]) => {
    setBottomItems(newOrder as string[]);
  };

  return (
    <div
      className={`flex w-full justify-center ${className} !mt-0`}
      style={{ marginTop: 0 }}
    >
      <Card className='w-full max-w-3xl'>
        <CardHeader>
          <CardTitle>Image-Text Matching Puzzle</CardTitle>
          <CardDescription>
            Match the concepts with their visual representations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <style jsx global>{`
              * {
                box-sizing: border-box;
              }
              .glow-effect {
                box-shadow: 0 0 10px 3px rgba(0, 255, 0, 0.5);
                transition: box-shadow 0.3s ease-in-out;
                overflow: hidden;
              }
              .grid-container {
                list-style-type: none;
                padding: 0;
                margin: 0;
              }
            `}</style>
            <div className='grid-container grid grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
              {topItems.map((imagePath, index) => (
                <div key={`top-${imagePath}`} className='w-full'>
                  <PuzzlePiece
                    content={imagePath}
                    isImage={true}
                    fixed
                    matched={isMatched(index)}
                  />
                </div>
              ))}
            </div>
            {isClient ? (
              <DynamicReorderGroup
                axis='x'
                values={bottomItems}
                onReorder={handleReorder}
                className='grid-container grid grid-cols-3 gap-4 sm:gap-6 md:gap-8'
              >
                {bottomItems.map((text, index) => (
                  <DynamicReorderItem
                    key={text}
                    value={text}
                    className='w-full'
                  >
                    <PuzzlePiece
                      content={text}
                      isImage={false}
                      matched={isMatched(index)}
                    />
                  </DynamicReorderItem>
                ))}
              </DynamicReorderGroup>
            ) : (
              <div className='grid-container grid grid-cols-3 gap-4 sm:gap-6 md:gap-8'>
                {bottomItems.map((text, index) => (
                  <div key={text} className='w-full'>
                    <PuzzlePiece
                      content={text}
                      isImage={false}
                      matched={isMatched(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className='text-sm text-muted-foreground'>
            Drag and drop the text items to match them with their corresponding
            images.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImageTextMatchingPuzzle;
