'use client';
import React, { useState, useEffect, useRef, type RefObject } from 'react';
import { TrendingDown } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { year: 1991, boys: 69, girls: 66 },
  { year: 1993, boys: 67, girls: 65 },
  { year: 1995, boys: 68, girls: 65 },
  { year: 1997, boys: 68, girls: 65 },
  { year: 1999, boys: 68, girls: 66 },
  { year: 2001, boys: 70, girls: 67 },
  { year: 2003, boys: 70, girls: 68 },
  { year: 2005, boys: 70, girls: 68 },
  { year: 2007, boys: 71, girls: 68 },
  { year: 2009, boys: 71, girls: 69 },
  { year: 2011, boys: 72, girls: 69 },
  { year: 2013, boys: 69, girls: 60 },
  { year: 2015, boys: 65, girls: 61 },
  { year: 2017, boys: 62, girls: 58 },
  { year: 2019, boys: 62, girls: 57 },
];

const chartConfig: ChartConfig = {
  boys: {
    label: 'Boys',
    color: 'hsl(var(--chart-1))',
  },
  girls: {
    label: 'Girls',
    color: 'hsl(var(--chart-2))',
  },
};

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

export function LineChartMultiple() {
  const [key, setKey] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(chartRef, { threshold: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      setKey((prevKey) => prevKey + 1);
      hasAnimated.current = true;
    }
  }, [isVisible]);

  return (
    <div className='flex w-full justify-center'>
      <Card className='w-full max-w-3xl' ref={chartRef}>
        <CardHeader>
          <CardTitle>Satisfied with Oneself</CardTitle>
          <CardDescription>The sociometer plunge of 2012</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width='100%' height={400}>
              <LineChart
                key={key}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='year'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[50, 75]}
                  label={{
                    value: 'Percent of Students',
                    angle: -90,
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' },
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type='monotone'
                  dataKey='boys'
                  stroke='var(--color-boys)'
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type='monotone'
                  dataKey='girls'
                  stroke='var(--color-girls)'
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className='flex w-full items-start gap-2 text-sm'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2 font-medium leading-none'>
                Trending down since 2012 <TrendingDown className='h-4 w-4' />
              </div>
              <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                Percent of U.S. students (8th, 10th, and 12th grade) who said
                they were satisfied with themselves.
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
