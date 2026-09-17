'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bar, BarChart, XAxis } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function DashboardPageLayoutOrdersBarChart() {
  const chartData = [
    { date: '2026-08-01', orders: 222 },
    { date: '2026-08-02', orders: 97 },
    { date: '2026-08-03', orders: 167 },
    { date: '2026-08-04', orders: 242 },
    { date: '2026-08-05', orders: 373 },
    { date: '2026-08-06', orders: 301 },
    { date: '2026-08-07', orders: 245 },
    { date: '2026-08-08', orders: 409 },
    { date: '2026-08-09', orders: 59 },
    { date: '2026-08-10', orders: 261 },
    { date: '2026-08-11', orders: 327 },
    { date: '2026-08-12', orders: 292 },
    { date: '2026-08-13', orders: 342 },
    { date: '2026-08-14', orders: 137 },
    { date: '2026-08-15', orders: 120 },
    { date: '2026-08-16', orders: 138 },
    { date: '2026-08-17', orders: 446 },
    { date: '2026-08-18', orders: 364 },
    { date: '2026-08-19', orders: 243 },
    { date: '2026-08-20', orders: 89 },
    { date: '2026-08-21', orders: 137 },
    { date: '2026-08-22', orders: 224 },
    { date: '2026-08-23', orders: 138 },
    { date: '2026-08-24', orders: 387 },
    { date: '2026-08-25', orders: 215 },
    { date: '2026-08-26', orders: 75 },
    { date: '2026-08-27', orders: 383 },
    { date: '2026-08-28', orders: 122 },
    { date: '2026-08-29', orders: 315 },
    { date: '2026-08-30', orders: 454 },
    { date: '2026-08-31', orders: 454 },
    { date: '2026-09-01', orders: 165 },
    { date: '2026-09-02', orders: 293 },
    { date: '2026-09-03', orders: 247 },
    { date: '2026-09-04', orders: 385 },
    { date: '2026-09-05', orders: 481 },
    { date: '2026-09-06', orders: 498 },
    { date: '2026-09-07', orders: 388 },
    { date: '2026-09-08', orders: 149 },
    { date: '2026-09-09', orders: 227 },
    { date: '2026-09-10', orders: 293 },
    { date: '2026-09-11', orders: 335 },
    { date: '2026-09-12', orders: 197 },
    { date: '2026-09-13', orders: 197 },
    { date: '2026-09-14', orders: 448 },
    { date: '2026-09-15', orders: 473 },
    { date: '2026-09-16', orders: 338 },
    { date: '2026-09-17', orders: 499 },
    { date: '2026-09-18', orders: 315 },
    { date: '2026-09-19', orders: 235 },
    { date: '2026-09-20', orders: 177 },
    { date: '2026-09-21', orders: 82 },
    { date: '2026-09-22', orders: 81 },
    { date: '2026-09-23', orders: 252 },
    { date: '2026-09-24', orders: 294 },
    { date: '2026-09-25', orders: 201 },
    { date: '2026-09-26', orders: 213 },
    { date: '2026-09-27', orders: 420 },
    { date: '2026-09-28', orders: 233 },
    { date: '2026-09-29', orders: 78 },
    { date: '2026-09-30', orders: 340 },
    { date: '2026-10-01', orders: 178 },
    { date: '2026-10-02', orders: 470 },
    { date: '2026-10-03', orders: 103 },
    { date: '2026-10-04', orders: 439 },
    { date: '2026-10-05', orders: 88 },
    { date: '2026-10-06', orders: 294 },
    { date: '2026-10-07', orders: 323 },
    { date: '2026-10-08', orders: 385 },
    { date: '2026-10-09', orders: 438 },
    { date: '2026-10-10', orders: 155 },
    { date: '2026-10-11', orders: 92 },
    { date: '2026-10-12', orders: 492 },
    { date: '2026-10-13', orders: 81 },
    { date: '2026-10-14', orders: 426 },
    { date: '2026-10-15', orders: 307 },
    { date: '2026-10-16', orders: 371 },
    { date: '2026-10-17', orders: 475 },
    { date: '2026-10-18', orders: 107 },
    { date: '2026-10-19', orders: 341 },
    { date: '2026-10-20', orders: 408 },
    { date: '2026-10-21', orders: 169 },
    { date: '2026-10-22', orders: 317 },
    { date: '2026-10-23', orders: 480 },
    { date: '2026-10-24', orders: 132 },
    { date: '2026-10-25', orders: 141 },
    { date: '2026-10-26', orders: 434 },
    { date: '2026-10-27', orders: 448 },
    { date: '2026-10-28', orders: 149 },
    { date: '2026-10-29', orders: 103 },
    { date: '2026-10-30', orders: 446 },
    { date: '2026-10-31', orders: 75 },
  ];

  const chartConfig = {
    visitors: {
      label: 'Visitors',
    },
    orders: {
      label: 'Orders',
      color: 'var(--muted-foreground)',
    },
  } satisfies ChartConfig;

  const isMobile = useIsMobile();

  const [timeRange, setTimeRange] = React.useState('30d');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d');
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date('2026-10-30');

    let daysToSubtract = 90;

    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  return (
    <div className="-order-1 md:col-span-2 xl:order-2 2xl:col-span-3">
      <Card className="@container/card h-full justify-between">
        <CardHeader>
          <CardTitle>
            <Link href="orders">Orders</Link>
          </CardTitle>
          <CardDescription>
            {timeRange === '7d' && <span>Last 7 days</span>}
            {timeRange === '30d' && <span>Last 30 days</span>}
            {timeRange === '90d' && <span>Last 3 months</span>}
          </CardDescription>
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
            >
              <ToggleGroupItem value="7d" className="cursor-pointer">
                Last 7 days
              </ToggleGroupItem>
              <ToggleGroupItem value="30d" className="cursor-pointer">
                Last 30 days
              </ToggleGroupItem>
              <ToggleGroupItem value="90d" className="cursor-pointer">
                Last 3 months
              </ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-40 cursor-pointer **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                size="sm"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl" position="popper">
                <SelectItem value="90d" className="cursor-pointer rounded-lg">
                  Last 3 months
                </SelectItem>
                <SelectItem value="30d" className="cursor-pointer rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="cursor-pointer rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <BarChart accessibilityLayer data={filteredData}>
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-GB', {
                    weekday: 'narrow',
                  });
                }}
              />
              <Bar dataKey="orders" fill="var(--color-muted-foreground)" radius={4} />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
