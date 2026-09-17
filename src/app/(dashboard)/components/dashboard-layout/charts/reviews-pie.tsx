'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

export default function DashboardPageLayoutReviewsPieChart() {
  const chartData = [
    { rating: 5, reviews: 72, fill: 'var(--color-chart-rating-5)' },
    { rating: 4, reviews: 38, fill: 'var(--color-chart-rating-4)' },
    { rating: 3, reviews: 11, fill: 'var(--color-chart-rating-3)' },
    { rating: 2, reviews: 3, fill: 'var(--color-chart-rating-2)' },
    { rating: 1, reviews: 8, fill: 'var(--color-chart-rating-1)' },
  ];

  const chartConfig = {
    reviews: {
      label: 'Reviews',
    },
    5: {
      label: '5 star',
      color: 'var(--chart-rating-5)',
    },
    4: {
      label: '4 star',
      color: 'var(--chart-rating-4)',
    },
    3: {
      label: '3 star',
      color: 'var(--chart-rating-3)',
    },
    2: {
      label: '2 star',
      color: 'var(--chart-rating-2)',
    },
    1: {
      label: '1 star',
      color: 'var(--chart-rating-1)',
    },
  } satisfies ChartConfig;

  const totalReviews = chartData.reduce((acc, curr) => acc + curr.reviews, 0);

  return (
    <div className="col-span-1 xl:order-1">
      <Card className="flex h-full flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            <Link href="reviews">Reviews</Link>
          </CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="reviews"
                nameKey="rating"
                innerRadius={85}
                outerRadius={100}
                strokeWidth={50}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {totalReviews.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                            Reviews
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            5 star up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
