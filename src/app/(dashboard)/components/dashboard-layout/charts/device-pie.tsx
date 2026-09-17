'use client';

import Link from 'next/link';
import { TrendingDown } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

export default function DashboardPageLayoutDevicesPieChart() {
  const chartData = [
    { device: 'desktop', orders: 2398, fill: 'var(--color-chart-2)' },
    { device: 'mobile', orders: 5336, fill: 'var(--color-chart-3)' },
    { device: 'unknown', orders: 1473, fill: 'var(--color-chart-4)' },
  ];

  const chartConfig = {
    orders: {
      label: 'Orders',
    },
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-2)',
    },
    mobile: {
      label: 'Mobile',
      color: 'var(--chart-3)',
    },
    unknown: {
      label: 'Unknown',
      color: 'var(--chart-4)',
    },
  } satisfies ChartConfig;

  const totalOrders = chartData.reduce((acc, curr) => acc + curr.orders, 0);

  return (
    <div className="col-span-1 xl:order-3">
      <Card className="flex h-full flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            <Link href="orders">Device</Link>
          </CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="orders"
                nameKey="device"
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
                            {totalOrders.toLocaleString()}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                            Orders
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
            Desktop down by 4.8% this month <TrendingDown className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
