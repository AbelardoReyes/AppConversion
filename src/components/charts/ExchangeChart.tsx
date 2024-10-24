import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Exchange } from "@/types/exchange";
import { getExchangeHistory } from "@/lib/store/history";

const LOCALE = "es-MX";

interface ExchangeChartProps {
  currency: string;
}

export default function ExchangeChart({ currency }: ExchangeChartProps) {
  const [chartData, setChartData] = useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chartConfig = useMemo(
    () => ({
      views: {
        label: "Exchange Rate"
      },
      [currency]: {
        label: currency,
        color: "hsl(var(--chart-1))",
        icon: CircleDollarSign
      }
    } satisfies ChartConfig),
    [currency]
  );

  const computedValues = useMemo(() => {
    if (!chartData.length) return { total: 0, average: 0, latest: 0 };

    const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
    const average = total / chartData.length;
    const latest = chartData[chartData.length - 1].value;

    return { total, average, latest };
  }, [chartData]);

  const dateFormatters = useMemo(() => ({
    short: new Intl.DateTimeFormat(LOCALE, {
      month: "short",
      day: "numeric"
    }),
    long: new Intl.DateTimeFormat(LOCALE, {
      month: "short",
      day: "numeric",
      year: "numeric"
    }),
    currency: new Intl.NumberFormat(LOCALE, {
      style: "currency",
      currency: currency
    })
  }), [currency]);

  useEffect(() => {
    const fetchExchangeHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getExchangeHistory(currency);

        if (!data?.length) {
          throw new Error("El historial de esta moneda esta vacío");
        }

        setChartData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo obtener el historial de intercambio");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeHistory();
  }, [currency]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-[400px] items-center justify-center">
          <div className="text-muted-foreground">Loading exchange rates...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{currency} Exchange Rate</CardTitle>
          <CardDescription>
            Latest rate: {dateFormatters.currency.format(computedValues.latest)}
          </CardDescription>
        </div>
        <div className="flex">
          <div
            className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Average Rate
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {dateFormatters.currency.format(computedValues.average)}
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
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => dateFormatters.short.format(new Date(value))}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => dateFormatters.currency.format(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) =>
                    dateFormatters.long.format(new Date(value))
                  }
                />
              }
            />
            <Line
              dataKey="value"
              type="monotone"
              stroke={`var(--color-${currency})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}