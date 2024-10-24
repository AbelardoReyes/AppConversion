import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { CircleDollarSign } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Exchange } from "@/types/exchange";
import { addExchangeToHistory, getExchangeHistory } from "@/lib/store/history";

const chartConfig = {
  views: {
    label: "Exchange Rate"
  },
  MXN: {
    label: "MXN",
    color: "hsl(var(--chart-1))",
    icon: CircleDollarSign
  }
} satisfies ChartConfig;

export default function ExchangeChart() {
  const [chartData, setChartData] = useState<Exchange[]>([]);

  useEffect(() => {
    const fetchExchangeHistory = async () => {
      const data = await getExchangeHistory("MXN");
      setChartData(data);
    };
    fetchExchangeHistory();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      addExchangeToHistory("MXN", {
        date: new Date().toISOString(),
        value: Math.random() * 100
      }).then(() => {
        getExchangeHistory("MXN").then((data) => {
          setChartData(data);
        });
      });
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const total = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>MXN Exchange Rate</CardTitle>
          <CardDescription>
            Showing exchange rates for the last period
          </CardDescription>
        </div>
        <div className="flex">
          <div
            className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              {chartConfig.MXN.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN"
                }).format(value)
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="value"
              type="monotone"
              stroke={`var(--color-MXN)`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}